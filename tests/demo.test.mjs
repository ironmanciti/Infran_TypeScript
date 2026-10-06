// 강의 시연 코드(.demos)와 demo 스킬 검증 테스트
// 실행: node --test tests/demo.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import {
  ROOT, listSections, loadManifest, matchesDemo, parseKey, resolveDemo,
  typeCheck, validateManifest, verifySection, writeDemo,
} from "../scripts/demo.mjs";

const CLI = join(ROOT, "scripts", "demo.mjs");
const cli = (...args) => spawnSync(process.execPath, [CLI, ...args], { encoding: "utf8", cwd: ROOT });
const withTmp = (fn) => {
  const dir = mkdtempSync(join(tmpdir(), "demo-test-"));
  try { return fn(dir); } finally { rmSync(dir, { recursive: true, force: true }); }
};

// ---------- 정상 케이스 ----------

test("모든 섹션의 manifest가 형식 검사를 통과한다", () => {
  assert.ok(listSections().includes("03"));
  for (const s of listSections()) assert.deepEqual(validateManifest(loadManifest(s), s), [], s);
});

test("모든 데모 코드가 예상한 타입 오류만 내고, 실행 결과가 예상 출력과 같다", () => {
  for (const s of listSections()) assert.deepEqual(verifySection(s), [], s);
});

test("parseKey: 3-9와 3-28-2를 해석한다", () => {
  assert.deepEqual(parseKey("3-9"), { section: "03", slide: "9", part: null });
  assert.deepEqual(parseKey("3-28-2"), { section: "03", slide: "28", part: 2 });
});

test("resolveDemo: 합칠 수 있는 슬라이드는 모든 부분을 라벨 주석과 함께 합친다", () => {
  const d = resolveDemo("3-9");
  assert.equal(d.key, "3-9");
  assert.match(d.code, /^\/\/ 과제 1\nconst number = 5;/);
  assert.match(d.code, /\n\n\/\/ 과제 2\nconst test = 4;/);
  assert.equal(d.output, "5\n짝수\n");
  assert.equal(d.next, "3-11");
});

test("resolveDemo: 합칠 수 없는 슬라이드는 1번 부분과 다음 부분 키를 준다", () => {
  const d = resolveDemo("3-28");
  assert.equal(d.key, "3-28-1");
  assert.equal(d.parts.length, 1);
  assert.equal(d.output, "50.5\n");
  assert.equal(d.next, "3-28-2");
});

test("resolveDemo: 마지막 부분의 다음은 다음 슬라이드다", () => {
  assert.equal(resolveDemo("3-28-3").next, "3-30");
});

test("resolveDemo: 오류를 일부러 보여 주는 슬라이드는 expectErrors와 note를 준다", () => {
  const d = resolveDemo("3-44");
  assert.deepEqual(d.parts[0].expectErrors, ["TS2304"]);
  assert.ok(d.parts[0].note);
});

test("CLI: write 후 check가 일치한다 (교체, 덧붙이기)", () => {
  withTmp((dir) => {
    const target = join(dir, "sub", "demo.ts");
    assert.equal(cli("write", "3-4", target).status, 0);
    assert.equal(cli("check", "3-4", target).status, 0);
    assert.equal(cli("write", "3-5", target, "--append").status, 0);
    assert.equal(cli("check", "3-5", target, "--append").status, 0);
    assert.match(readFileSync(target, "utf8"), /^const groceryShopping[\s\S]*\n\nconst age = 18;/);
  });
});

test("CLI: show가 JSON을 출력한다", () => {
  const r = cli("show", "3-9");
  assert.equal(r.status, 0);
  assert.equal(JSON.parse(r.stdout).title, "실습 풀이");
});

test("CLI: list가 데모 슬라이드 목록을 출력한다", () => {
  const r = cli("list", "3");
  assert.equal(r.status, 0);
  assert.match(r.stdout, /3-9 {2}18강 실습 풀이/);
});

// ---------- 경계값 ----------

test("parseKey: 앞자리 0과 공백을 허용한다", () => {
  assert.deepEqual(parseKey(" 03-09 "), { section: "03", slide: "9", part: null });
});

test("resolveDemo: 부분이 하나인 슬라이드는 라벨 주석을 붙이지 않는다", () => {
  assert.match(resolveDemo("3-4").code, /^const groceryShopping = true;/);
});

test("resolveDemo: 합칠 수 있는 슬라이드도 부분 번호로 하나만 고를 수 있다", () => {
  const d = resolveDemo("3-9-2");
  assert.match(d.code, /^const test = 4;/);
  assert.equal(d.next, "3-11");
});

test("resolveDemo: 섹션의 마지막 슬라이드는 next가 null이다", () => {
  assert.equal(resolveDemo("3-44").next, null);
});

test("resolveDemo: 출력이 없는 슬라이드는 output이 빈 문자열이다", () => {
  assert.equal(resolveDemo("3-14").output, "");
});

test("matchesDemo: 줄바꿈이 CRLF이거나 끝 공백이 달라도 같다고 본다", () => {
  const code = resolveDemo("3-9").code;
  assert.ok(matchesDemo(code.replace(/\n/g, "\r\n") + "\r\n\r\n", code));
});

test("writeDemo: 빈 파일에 덧붙이면 앞에 빈 줄을 넣지 않는다", () => {
  withTmp((dir) => {
    const target = join(dir, "demo.ts");
    writeFileSync(target, "\n");
    writeDemo("const a = 1;\n", target, { append: true });
    assert.equal(readFileSync(target, "utf8"), "const a = 1;\n");
  });
});

// ---------- 실패 케이스 ----------

test("parseKey: 형식이 잘못된 키는 오류", () => {
  for (const key of ["3", "3-", "abc", "3-9-", "3.9", ""]) assert.throws(() => parseKey(key), /키 형식/, key);
  assert.throws(() => parseKey("3-9-0"), /1부터/);
});

test("resolveDemo: 코드가 없는 슬라이드는 가능한 슬라이드 목록과 함께 오류", () => {
  assert.throws(() => resolveDemo("3-8"), /슬라이드 8에는 시연 코드가 없음.*3-9/);
});

test("resolveDemo: 없는 섹션, 범위를 넘는 부분 번호는 오류", () => {
  assert.throws(() => resolveDemo("99-1"), /섹션 99의 데모가 없음/);
  assert.throws(() => resolveDemo("3-28-4"), /1~3번/);
});

test("matchesDemo: 코드가 한 글자라도 다르면 불일치", () => {
  const code = resolveDemo("3-9").code;
  assert.equal(matchesDemo(code.replace("number < 5", "number <= 5"), code), false);
  assert.equal(matchesDemo(`// 추가한 주석\n${code}`, code), false);
});

test("CLI: 코드가 없는 슬라이드, 다른 내용의 파일은 종료 코드 1", () => {
  assert.equal(cli("show", "3-8").status, 1);
  withTmp((dir) => {
    const target = join(dir, "demo.ts");
    writeFileSync(target, "console.log(1);\n");
    assert.equal(cli("check", "3-9", target).status, 1);
    assert.equal(cli("check", "3-9", join(dir, "none.ts")).status, 1);
  });
});

test("validateManifest: 빠진 필드, 없는 파일, 한자, 잘못된 expectErrors를 찾는다", () => {
  const m = structuredClone(loadManifest("03"));
  m.slides["9"].parts[0].file = "none.ts";
  m.slides["9"].points = [];
  m.slides["4"].combine = "yes";
  m.slides["5"].parts[0].expectErrors = ["2678"];
  m.slides["11"].title = "試驗";
  const errors = validateManifest(m, "03").join("\n");
  for (const want of ["none.ts 없음", "points가 비어 있음", "combine은", "expectErrors는", "한자"]) {
    assert.match(errors, new RegExp(want));
  }
  assert.match(validateManifest(m, "04").join("\n"), /폴더\(section04\)/);
});

test("typeCheck: 임시 폴더 파일의 오류 코드도 파일별로 찾는다", () => {
  withTmp((dir) => {
    const bad = join(dir, "bad.ts");
    const good = join(dir, "good.ts");
    writeFileSync(bad, "const n: number = \"x\";\n");
    writeFileSync(good, "const n = 1;\n");
    const r = typeCheck([bad, good]);
    assert.deepEqual(r[bad], ["TS2322"]);
    assert.deepEqual(r[good], []);
  });
});

test("demo: Claude Code용 스킬과 Codex·Gemini용 스킬 내용이 같다", () => {
  const a = readFileSync(join(ROOT, ".agents/skills/demo/SKILL.md"), "utf8");
  const b = readFileSync(join(ROOT, ".claude/skills/demo/SKILL.md"), "utf8");
  assert.equal(a, b);
});
