// 퀴즈 문제 파일(quizzes/sectionNN.json) 검증 도구
// 실행: node scripts/validate-quiz.mjs [파일 경로 ...]
//   파일을 지정하지 않으면 quizzes 폴더의 모든 sectionNN.json을 검사합니다.
import { readFileSync, readdirSync } from "node:fs";
import { basename, join } from "node:path";
import { pathToFileURL } from "node:url";

export const CHOICE_KEYS = ["A", "B", "C"];
export const REQUIRED_FIELDS = ["id", "lecture", "topic", "question", "code", "choices", "answer", "wrongReasons", "explanation"];
const HANJA = /[㐀-䶿一-鿿豈-﫿]/;

// 객체 안의 모든 문자열 값을 [경로, 값] 목록으로 모읍니다.
function collectStrings(value, path = "") {
  if (typeof value === "string") return [[path, value]];
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) => collectStrings(v, path ? `${path}.${k}` : k));
  }
  return [];
}

// 문제 파일 하나를 검사하고 발견한 오류 목록을 돌려줍니다.
// fileName을 주면 파일 이름의 섹션 번호와 section 필드가 같은지도 검사합니다.
export function validateQuiz(quiz, fileName) {
  const errors = [];
  for (const key of ["section", "title", "version"]) {
    if (typeof quiz[key] !== "string" || quiz[key] === "") errors.push(`${key} 없음`);
  }
  if (fileName) {
    const m = basename(fileName).match(/^section(\d+)\.json$/);
    if (!m) errors.push(`파일 이름은 sectionNN.json 형식이어야 함`);
    else if (m[1] !== quiz.section) errors.push(`파일 이름(section${m[1]})과 section(${quiz.section})이 다름`);
  }
  if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) {
    errors.push("questions가 비어 있음");
    return errors;
  }
  const ids = new Set();
  for (const q of quiz.questions) {
    const where = q.id ?? "(id 없음)";
    for (const field of REQUIRED_FIELDS) {
      if (q[field] === undefined || q[field] === "") errors.push(`${where}: ${field} 없음`);
    }
    if (ids.has(q.id)) errors.push(`${where}: id 중복`);
    ids.add(q.id);
    if (q.id !== undefined && !new RegExp(`^s${quiz.section}-q\\d+$`).test(q.id)) {
      errors.push(`${where}: id는 s${quiz.section}-q번호 형식이어야 함`);
    }

    const choiceKeys = Object.keys(q.choices ?? {}).sort();
    if (choiceKeys.join() !== CHOICE_KEYS.join()) errors.push(`${where}: 보기는 A, B, C 세 개여야 함`);
    if (!CHOICE_KEYS.includes(q.answer)) errors.push(`${where}: 정답이 보기에 없음`);

    const wrongKeys = CHOICE_KEYS.filter((k) => k !== q.answer);
    const reasonKeys = Object.keys(q.wrongReasons ?? {}).sort();
    if (reasonKeys.join() !== wrongKeys.join()) {
      errors.push(`${where}: wrongReasons는 오답 보기(${wrongKeys.join(", ")})마다 하나씩 있어야 함`);
    }
  }

  // 3문제 이상이면 A, B, C가 모두 한 번 이상 정답이어야 합니다.
  if (quiz.questions.length >= 3) {
    const used = new Set(quiz.questions.map((q) => q.answer));
    const missing = CHOICE_KEYS.filter((k) => !used.has(k));
    if (missing.length > 0) errors.push(`정답 기호가 한쪽으로 치우침: ${missing.join(", ")}가 정답인 문제가 없음`);
  }

  for (const [path, text] of collectStrings(quiz)) {
    if (HANJA.test(text)) errors.push(`${path}: 한자가 들어 있음`);
  }
  return errors;
}

// 코드를 실행해 console.log 출력을 줄 단위로 모읍니다. 타입 주석이 있어 실행할 수 없으면 null.
export function runCode(code) {
  const lines = [];
  const fakeConsole = { log: (...args) => lines.push(args.map(String).join(" ")) };
  try {
    new Function("console", code)(fakeConsole);
  } catch (e) {
    if (e instanceof SyntaxError) return null;
    throw e;
  }
  return lines;
}

// 출력이 있는 코드는 실제 실행 결과(줄을 ", "로 이은 값)가 정답 보기와 같은지 검사합니다.
export function checkOutputs(quiz) {
  const errors = [];
  for (const q of quiz.questions ?? []) {
    let lines;
    try {
      lines = runCode(q.code ?? "");
    } catch (e) {
      errors.push(`${q.id}: 코드 실행 중 오류 (${e.message})`);
      continue;
    }
    if (lines === null || lines.length === 0) continue;
    const actual = lines.join(", ");
    if (actual !== q.choices?.[q.answer]) {
      errors.push(`${q.id}: 실행 결과 "${actual}"가 정답 보기 "${q.choices?.[q.answer]}"와 다름`);
    }
  }
  return errors;
}

// 파일 하나를 읽어 모든 검사를 실행합니다.
export function validateFile(filePath) {
  let quiz;
  try {
    quiz = JSON.parse(readFileSync(filePath, "utf8"));
  } catch (e) {
    return [`JSON을 읽을 수 없음 (${e.message})`];
  }
  return [...validateQuiz(quiz, filePath), ...checkOutputs(quiz)];
}

function main(args) {
  const quizDir = join(import.meta.dirname, "..", "quizzes");
  const files = args.length > 0
    ? args
    : readdirSync(quizDir).filter((f) => /^section\d+\.json$/.test(f)).map((f) => join(quizDir, f));
  let failed = false;
  for (const file of files) {
    const errors = validateFile(file);
    if (errors.length === 0) {
      console.log(`통과: ${basename(file)}`);
    } else {
      failed = true;
      console.log(`실패: ${basename(file)}`);
      for (const e of errors) console.log(`  - ${e}`);
    }
  }
  process.exitCode = failed ? 1 : 0;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) main(process.argv.slice(2));
