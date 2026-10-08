// 강의 시연용 슬라이드 코드(.demos/sectionNN) 도구
// 실행:
//   node .claude/skills/demo/scripts/demo.mjs show 3-9            슬라이드 코드와 설명을 JSON으로 출력
//     키 대신 섹션 번호만 주면(예: show 3) 그 섹션의 첫 슬라이드를 씀
//     키 대신 next(또는 다음)를 주면 마지막으로 보여 준 슬라이드의 다음 슬라이드를 씀
//   node .claude/skills/demo/scripts/demo.mjs write 3-9 [파일]    코드를 파일에 그대로 씀 (기본: playground/demo.ts)
//   node .claude/skills/demo/scripts/demo.mjs check 3-9 [파일]    파일 내용이 원본 코드와 같은지 확인
//     write, check 뒤에 --append를 붙이면 기존 내용 아래에 덧붙이는 방식으로 동작
//   node .claude/skills/demo/scripts/demo.mjs verify [03]         모든 데모 코드를 타입 검사하고 실행해 예상 출력과 비교
//   node .claude/skills/demo/scripts/demo.mjs list [03]           데모가 있는 슬라이드 목록
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

export const ROOT = join(import.meta.dirname, "..", "..", "..", "..");
// 테스트에서는 환경 변수 DEMO_DIR로 다른 폴더를 쓸 수 있습니다.
export const DEMO_DIR = process.env.DEMO_DIR ? resolve(process.env.DEMO_DIR) : join(ROOT, ".demos");
export const DEFAULT_TARGET = "playground/demo.ts";
// 마지막으로 보여 준 키를 기억하는 파일 (테스트에서는 DEMO_STATE로 바꿀 수 있음)
export const STATE_FILE = process.env.DEMO_STATE ? resolve(process.env.DEMO_STATE) : join(ROOT, "playground", ".demo-last");
const HANJA = /[㐀-䶿一-鿿豈-﫿]/;
const TSC = join(ROOT, "node_modules", "typescript", "bin", "tsc");

const pad = (n) => String(Number(n)).padStart(2, "0");
const normalize = (text) => text.replace(/\r\n/g, "\n").replace(/\s+$/, "") + "\n";
const sectionDir = (section) => join(DEMO_DIR, `section${section}`);

// "3-9", "03-09", "3-28-2" 형식의 키를 { section: "03", slide: "9", part: 2 | null }로 바꿉니다.
export function parseKey(key) {
  const m = String(key).trim().match(/^(\d{1,2})-(\d{1,3})(?:-(\d{1,2}))?$/);
  if (!m) throw new Error(`키 형식이 잘못됨: "${key}" (예: 3-9, 3-28-2)`);
  const part = m[3] === undefined ? null : Number(m[3]);
  if (part === 0) throw new Error(`부분 번호는 1부터 시작함: "${key}"`);
  return { section: pad(m[1]), slide: String(Number(m[2])), part };
}

export function listSections() {
  if (!existsSync(DEMO_DIR)) return [];
  return readdirSync(DEMO_DIR)
    .map((d) => d.match(/^section(\d{2})$/)?.[1])
    .filter(Boolean)
    .sort();
}

export function loadManifest(section) {
  const file = join(sectionDir(section), "manifest.json");
  if (!existsSync(file)) throw new Error(`섹션 ${Number(section)}의 데모가 없음 (.demos/section${section}/manifest.json)`);
  return JSON.parse(readFileSync(file, "utf8"));
}

const slideNumbers = (manifest) => Object.keys(manifest.slides).map(Number).sort((a, b) => a - b);
const readPart = (section, part) => normalize(readFileSync(join(sectionDir(section), part.file), "utf8"));
const readOutput = (section, part) => {
  const file = join(sectionDir(section), part.file.replace(/\.ts$/, ".out"));
  return existsSync(file) ? readFileSync(file, "utf8").replace(/\r\n/g, "\n") : "";
};

// 여러 부분을 한 파일로 합칠 때 각 부분 앞에 // 라벨 주석을 붙입니다.
function joinParts(section, parts) {
  if (parts.length === 1) return readPart(section, parts[0]);
  return parts.map((p) => `// ${p.label}\n${readPart(section, p)}`).join("\n");
}

// 섹션 번호만 받으면("2", "02") 그 섹션의 첫 슬라이드 키를 돌려줍니다.
export function expandKey(key) {
  const m = String(key).trim().match(/^(\d{1,2})$/);
  if (!m) return key;
  const section = pad(m[1]);
  const first = slideNumbers(loadManifest(section))[0];
  if (first === undefined) throw new Error(`섹션 ${Number(section)}에 시연 코드가 없음`);
  return `${Number(section)}-${first}`;
}

// 키에 해당하는 시연 코드와 설명을 돌려줍니다.
export function resolveDemo(key) {
  const { section, slide, part } = parseKey(expandKey(key));
  const manifest = loadManifest(section);
  const s = manifest.slides[slide];
  const sn = Number(section);
  if (!s) {
    throw new Error(`슬라이드 ${slide}에는 시연 코드가 없음. 가능한 슬라이드: ${slideNumbers(manifest).map((n) => `${sn}-${n}`).join(", ")}`);
  }
  if (part !== null && part > s.parts.length) {
    throw new Error(`슬라이드 ${slide}의 부분은 1~${s.parts.length}번까지 있음`);
  }
  // 부분 번호가 없으면: 합칠 수 있는 슬라이드는 전체, 아니면 1번 부분
  const index = part ?? (s.combine ? null : 1);
  const parts = index === null ? s.parts : [s.parts[index - 1]];

  let next = null;
  if (index !== null && index < s.parts.length) next = `${sn}-${slide}-${index + 1}`;
  else {
    const after = slideNumbers(manifest).find((n) => n > Number(slide));
    if (after !== undefined) next = `${sn}-${after}`;
  }

  return {
    key: index === null ? `${sn}-${slide}` : `${sn}-${slide}-${index}`,
    section: manifest.title,
    lecture: s.lecture,
    title: s.title,
    parts: parts.map((p, i) => ({ label: p.label, number: (index ?? i + 1), note: p.note ?? null, expectErrors: p.expectErrors ?? [] })),
    totalParts: s.parts.length,
    code: joinParts(section, parts),
    output: parts.map((p) => readOutput(section, p)).join(""),
    points: s.points,
    next,
  };
}

export const isNextWord = (key) => ["next", "다음"].includes(String(key ?? "").trim().toLowerCase());

export function saveLastKey(key) {
  mkdirSync(dirname(STATE_FILE), { recursive: true });
  writeFileSync(STATE_FILE, `${key}\n`);
}

// 마지막으로 보여 준 슬라이드의 다음 키를 돌려줍니다.
export function nextKey() {
  if (!existsSync(STATE_FILE)) throw new Error("아직 보여 준 슬라이드가 없음. 먼저 /demo 2 처럼 시작하세요");
  const last = readFileSync(STATE_FILE, "utf8").trim();
  const { next } = resolveDemo(last);
  if (!next) throw new Error(`${last}가 이 섹션의 마지막 시연 코드임`);
  return next;
}

// 파일 내용이 시연 코드와 같은지 확인합니다. append이면 파일 끝부분만 비교합니다.
export function matchesDemo(fileText, code, { append = false } = {}) {
  const actual = normalize(fileText);
  return append ? actual.endsWith(code) : actual === code;
}

export function writeDemo(code, target, { append = false } = {}) {
  mkdirSync(dirname(target), { recursive: true });
  if (append && existsSync(target)) {
    const before = normalize(readFileSync(target, "utf8"));
    writeFileSync(target, before.trim() === "" ? code : `${before}\n${code}`);
  } else {
    writeFileSync(target, code);
  }
}

// manifest 형식을 검사하고 오류 목록을 돌려줍니다.
export function validateManifest(manifest, section) {
  const errors = [];
  for (const key of ["section", "title", "version"]) {
    if (typeof manifest[key] !== "string" || manifest[key] === "") errors.push(`${key} 없음`);
  }
  if (section && manifest.section !== section) errors.push(`폴더(section${section})와 section(${manifest.section})이 다름`);
  if (!manifest.slides || typeof manifest.slides !== "object" || Object.keys(manifest.slides).length === 0) {
    errors.push("slides가 비어 있음");
    return errors;
  }
  if (HANJA.test(JSON.stringify(manifest))) errors.push("한자가 들어 있음");
  for (const [num, s] of Object.entries(manifest.slides)) {
    const where = `슬라이드 ${num}`;
    if (!/^[1-9]\d*$/.test(num)) errors.push(`${where}: 슬라이드 번호는 0으로 시작하지 않는 숫자여야 함`);
    for (const key of ["lecture", "title"]) {
      if (typeof s[key] !== "string" || s[key] === "") errors.push(`${where}: ${key} 없음`);
    }
    if (typeof s.combine !== "boolean") errors.push(`${where}: combine은 true/false여야 함`);
    if (!Array.isArray(s.points) || s.points.length === 0) errors.push(`${where}: points가 비어 있음`);
    if (!Array.isArray(s.parts) || s.parts.length === 0) {
      errors.push(`${where}: parts가 비어 있음`);
      continue;
    }
    for (const p of s.parts) {
      if (typeof p.label !== "string" || p.label === "") errors.push(`${where}: label 없음`);
      if (typeof p.file !== "string" || !p.file.endsWith(".ts")) {
        errors.push(`${where}: file은 .ts 파일이어야 함`);
        continue;
      }
      const file = join(sectionDir(manifest.section), p.file);
      if (!existsSync(file)) errors.push(`${where}: ${p.file} 없음`);
      else if (HANJA.test(readFileSync(file, "utf8"))) errors.push(`${where}: ${p.file}에 한자가 들어 있음`);
      if (p.expectErrors !== undefined && (!Array.isArray(p.expectErrors) || !p.expectErrors.every((c) => /^TS\d+$/.test(c)))) {
        errors.push(`${where}: expectErrors는 ["TS1234"] 형식이어야 함`);
      }
      // source: 슬라이드의 코드 블록을 옮겼으면 "slide"(기본), 표·문장을 코드로 옮겼으면 "table"
      if (p.source !== undefined && !["slide", "table"].includes(p.source)) {
        errors.push(`${where}: source는 "slide" 또는 "table"이어야 함`);
      }
    }
  }
  return errors;
}

function runTsc(files) {
  const r = spawnSync(process.execPath, [
    TSC, "--noEmit", "--ignoreConfig", "--strict", "--target", "esnext",
    "--module", "nodenext", "--moduleDetection", "force", "--pretty", "false", ...files,
  ], { encoding: "utf8", cwd: ROOT });
  const result = Object.fromEntries(files.map((f) => [resolve(f), []]));
  for (const line of (r.stdout + r.stderr).split(/\r?\n/)) {
    const m = line.match(/^(.+?)\(\d+,\d+\): error (TS\d+)/);
    if (m) (result[resolve(ROOT, m[1])] ??= []).push(m[2]);
  }
  return result;
}

// 여러 .ts 파일을 한 번에 타입 검사하고 { 파일 경로: [오류 코드] }를 돌려줍니다.
// tsc는 문법 오류(TS1xxx)가 하나라도 있으면 다른 파일의 타입 오류를 보고하지 않으므로,
// 문법 오류가 난 파일을 빼고 나머지를 다시 검사합니다.
export function typeCheck(files) {
  const result = {};
  let rest = files;
  while (rest.length) {
    const round = runTsc(rest);
    const broken = Object.keys(round).filter((f) => round[f].some((c) => /^TS1\d{3}$/.test(c)));
    for (const f of broken) result[f] = round[f];
    if (broken.length === 0) return { ...result, ...round };
    rest = rest.filter((f) => !broken.includes(resolve(f)));
  }
  return result;
}

export function runTs(file) {
  const r = spawnSync(process.execPath, [file], { encoding: "utf8", cwd: ROOT });
  return r.stdout.replace(/\r\n/g, "\n");
}

const sameSet = (a, b) => [...new Set(a)].sort().join(",") === [...new Set(b)].sort().join(",");

// 섹션의 모든 데모를 검사합니다. 합칠 수 있는 슬라이드는 합친 코드도 검사합니다.
export function verifySection(section) {
  const manifest = loadManifest(section);
  const errors = validateManifest(manifest, section).map((e) => `section${section}: ${e}`);
  if (errors.length) return errors;

  const tmp = mkdtempSync(join(tmpdir(), "demo-verify-"));
  try {
    const checks = [];
    for (const [num, s] of Object.entries(manifest.slides)) {
      for (const p of s.parts) {
        checks.push({
          name: `${Number(section)}-${num} ${p.label}`,
          file: join(sectionDir(section), p.file),
          expectErrors: p.expectErrors ?? [],
          output: readOutput(section, p),
        });
      }
      if (s.combine && s.parts.length > 1) {
        const file = join(tmp, `s${num}-combined.ts`);
        writeFileSync(file, joinParts(section, s.parts));
        checks.push({
          name: `${Number(section)}-${num} 합친 코드`,
          file,
          expectErrors: s.parts.flatMap((p) => p.expectErrors ?? []),
          output: s.parts.map((p) => readOutput(section, p)).join(""),
        });
      }
    }
    const tsErrors = typeCheck(checks.map((c) => c.file));
    for (const c of checks) {
      const got = tsErrors[resolve(c.file)] ?? [];
      if (!sameSet(got, c.expectErrors)) {
        errors.push(`${c.name}: 타입 오류 [${got.join(", ")}] (예상 [${c.expectErrors.join(", ")}])`);
      }
      const out = runTs(c.file);
      if (out !== c.output) errors.push(`${c.name}: 실행 결과가 예상 출력(.out)과 다름`);
    }
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
  return errors;
}

function main(argv) {
  const [cmd, ...rest] = argv;
  const append = rest.includes("--append");
  const args = rest.filter((a) => a !== "--append");
  try {
    if (cmd === "show") {
      const demo = resolveDemo(isNextWord(args[0]) ? nextKey() : args[0]);
      saveLastKey(demo.key);
      console.log(JSON.stringify(demo, null, 2));
      return 0;
    }
    if (cmd === "write" || cmd === "check") {
      const demo = resolveDemo(args[0]);
      const target = resolve(ROOT, args[1] ?? DEFAULT_TARGET);
      const shown = relative(ROOT, target);
      if (cmd === "write") {
        writeDemo(demo.code, target, { append });
        console.log(`${demo.key} → ${shown}`);
        return 0;
      }
      if (!existsSync(target)) {
        console.error(`${shown} 없음`);
        return 1;
      }
      const ok = matchesDemo(readFileSync(target, "utf8"), demo.code, { append });
      console.log(ok ? `일치: ${shown}` : `불일치: ${shown}`);
      return ok ? 0 : 1;
    }
    if (cmd === "verify") {
      const sections = args.length ? args.map(pad) : listSections();
      const errors = sections.flatMap(verifySection);
      for (const e of errors) console.error(`실패: ${e}`);
      console.log(errors.length ? `오류 ${errors.length}개` : `통과: section ${sections.join(", ")}`);
      return errors.length ? 1 : 0;
    }
    if (cmd === "list") {
      const sections = args.length ? args.map(pad) : listSections();
      for (const sec of sections) {
        const m = loadManifest(sec);
        console.log(m.title);
        for (const n of slideNumbers(m)) {
          const s = m.slides[n];
          console.log(`  ${Number(sec)}-${n}  ${s.lecture} ${s.title}${s.parts.length > 1 ? ` (${s.parts.length}개 부분)` : ""}`);
        }
      }
      return 0;
    }
    console.error("사용법: node .claude/skills/demo/scripts/demo.mjs show|write|check|verify|list ...");
    return 1;
  } catch (e) {
    console.error(e.message);
    return 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exitCode = main(process.argv.slice(2));
}
