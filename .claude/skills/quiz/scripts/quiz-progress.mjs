// 퀴즈 진행 상황 저장 도구 (quiz 스킬이 중단한 곳부터 이어서 풀 때 사용)
// 실행:
//   node .claude/skills/quiz/scripts/quiz-progress.mjs show 3                                  저장된 진행 상황을 JSON으로 출력
//   node .claude/skills/quiz/scripts/quiz-progress.mjs save 3 --next 13 --attempt 0 --results O,O,R,X   진행 상황 저장
//   node .claude/skills/quiz/scripts/quiz-progress.mjs clear 3                                 진행 상황 삭제
//
// results 기호: O = 첫 시도에 정답, R = 두 번째 시도에 정답, X = 두 번 틀림
// next: 지금 풀 문제의 순번(0부터). attempt: 그 문제에서 이미 틀린 횟수(0 또는 1)
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

export const ROOT = join(import.meta.dirname, "..", "..", "..", "..");
export const PROGRESS_DIR = join(ROOT, ".quiz-progress");
export const QUIZ_DIR = join(ROOT, "quizzes");
export const RESULT_CODES = ["O", "R", "X"];

// "3", "03", "섹션 3" 같은 입력을 "03"으로 바꿉니다.
export function normalizeSection(input) {
  const m = String(input ?? "").match(/\d{1,2}/);
  if (!m) throw new Error(`섹션 번호가 잘못됨: "${input}"`);
  return String(Number(m[0])).padStart(2, "0");
}

function loadQuiz(section, quizDir) {
  const file = join(quizDir, `section${section}.json`);
  if (!existsSync(file)) throw new Error(`섹션 ${Number(section)}의 문제 파일이 없음`);
  return JSON.parse(readFileSync(file, "utf8"));
}

const progressFile = (section, dir) => join(dir, `section${section}.json`);

// 저장된 진행 상황을 돌려줍니다. 없으면 { exists: false }.
// 문제 파일의 version이 저장 당시와 다르면 stale: true (문제가 바뀌었으므로 이어 풀 수 없음).
export function loadProgress(input, { dir = PROGRESS_DIR, quizDir = QUIZ_DIR } = {}) {
  const section = normalizeSection(input);
  const quiz = loadQuiz(section, quizDir);
  const file = progressFile(section, dir);
  if (!existsSync(file)) return { exists: false, section, total: quiz.questions.length };
  const saved = JSON.parse(readFileSync(file, "utf8"));
  const results = saved.results ?? [];
  return {
    exists: true,
    section,
    total: quiz.questions.length,
    stale: saved.version !== quiz.version,
    next: saved.next,
    attempt: saved.attempt,
    results,
    correct: results.filter((r) => r === "O" || r === "R").length,
    wrong: results.filter((r) => r === "X").length,
    updated: saved.updated,
  };
}

// 진행 상황을 검사한 뒤 저장합니다. 잘못된 값이면 오류를 던집니다.
export function saveProgress(input, { next, attempt, results }, { dir = PROGRESS_DIR, quizDir = QUIZ_DIR } = {}) {
  const section = normalizeSection(input);
  const quiz = loadQuiz(section, quizDir);
  const total = quiz.questions.length;
  if (!Number.isInteger(next) || next < 0 || next >= total) throw new Error(`next는 0~${total - 1} 사이여야 함: ${next}`);
  if (attempt !== 0 && attempt !== 1) throw new Error(`attempt는 0 또는 1이어야 함: ${attempt}`);
  if (!Array.isArray(results) || results.length !== next) throw new Error(`results 개수(${results?.length})가 next(${next})와 같아야 함`);
  const bad = results.filter((r) => !RESULT_CODES.includes(r));
  if (bad.length > 0) throw new Error(`results 기호는 O, R, X만 쓸 수 있음: ${bad.join(", ")}`);

  mkdirSync(dir, { recursive: true });
  const data = { section, version: quiz.version, next, attempt, results, updated: new Date().toISOString() };
  writeFileSync(progressFile(section, dir), JSON.stringify(data, null, 2) + "\n", "utf8");
  return data;
}

export function clearProgress(input, { dir = PROGRESS_DIR } = {}) {
  const section = normalizeSection(input);
  rmSync(progressFile(section, dir), { force: true });
  return { cleared: true, section };
}

function parseSaveArgs(args) {
  const get = (name) => {
    const i = args.indexOf(`--${name}`);
    return i === -1 ? undefined : args[i + 1];
  };
  const raw = get("results") ?? "";
  return {
    next: Number(get("next")),
    attempt: Number(get("attempt") ?? 0),
    results: raw === "" ? [] : raw.split(",").map((r) => r.trim().toUpperCase()),
  };
}

function main([command, section, ...rest]) {
  try {
    let out;
    if (command === "show") out = loadProgress(section);
    else if (command === "save") out = saveProgress(section, parseSaveArgs(rest));
    else if (command === "clear") out = clearProgress(section);
    else throw new Error("사용법: node .claude/skills/quiz/scripts/quiz-progress.mjs show|save|clear <섹션> [--next N --attempt 0|1 --results O,R,X]");
    console.log(JSON.stringify(out));
  } catch (e) {
    console.error(e.message);
    process.exitCode = 1;
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) main(process.argv.slice(2));
