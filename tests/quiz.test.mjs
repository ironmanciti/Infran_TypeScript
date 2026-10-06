// 퀴즈 문제 파일과 스킬 파일 검증 테스트
// 실행: node --test tests/quiz.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { validateQuiz, runCode, checkOutputs } from "../scripts/validate-quiz.mjs";

const ROOT = join(import.meta.dirname, "..");
const QUIZ_DIR = join(ROOT, "quizzes");
const quizFiles = readdirSync(QUIZ_DIR).filter((f) => /^section\d+\.json$/.test(f));
const loadQuiz = (file) => JSON.parse(readFileSync(join(QUIZ_DIR, file), "utf8"));

const sample = () => ({
  section: "99",
  title: "샘플",
  version: "1.0.0",
  questions: [
    {
      id: "s99-q1", lecture: "1강", topic: "t", question: "q", code: "c",
      choices: { A: "a", B: "b", C: "c" },
      answer: "A",
      wrongReasons: { B: "b 이유", C: "c 이유" },
      explanation: "해설",
    },
  ],
});

// ---------- 정상 케이스 ----------

test("quizzes 폴더에 문제 파일이 하나 이상 있다", () => {
  assert.ok(quizFiles.length > 0);
});

test("모든 문제 파일이 JSON으로 읽히고 형식 검사를 통과한다", () => {
  for (const file of quizFiles) {
    assert.deepEqual(validateQuiz(loadQuiz(file), file), [], file);
  }
});

test("모든 문제 파일에는 5문제 이상이 있다", () => {
  for (const file of quizFiles) {
    assert.ok(loadQuiz(file).questions.length >= 5, file);
  }
});

test("출력이 있는 코드는 실제 실행 결과가 정답 보기와 같다", () => {
  for (const file of quizFiles) {
    assert.deepEqual(checkOutputs(loadQuiz(file)), [], file);
  }
});

const SKILLS = ["quiz", "quiz-author"];

for (const name of SKILLS) {
  // quiz-author는 강사용이라 git에 올리지 않으므로, 수강생 저장소에는 없을 수 있습니다.
  if (name === "quiz-author" && !existsSync(join(ROOT, `.claude/skills/${name}`))) continue;

  test(`${name}: Claude Code용 스킬과 Codex·Gemini용 스킬 내용이 같다`, () => {
    const a = readFileSync(join(ROOT, `.agents/skills/${name}/SKILL.md`), "utf8");
    const b = readFileSync(join(ROOT, `.claude/skills/${name}/SKILL.md`), "utf8");
    assert.equal(a, b);
  });

  test(`${name}: SKILL.md 머리말에 name과 description이 있다`, () => {
    const text = readFileSync(join(ROOT, `.agents/skills/${name}/SKILL.md`), "utf8");
    const front = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    assert.ok(front, "머리말 없음");
    assert.match(front[1], new RegExp(`^name: ${name}$`, "m"));
    assert.match(front[1], /^description: .+/m);
  });
}

const runCli = (...args) =>
  spawnSync(process.execPath, [join(ROOT, "scripts/validate-quiz.mjs"), ...args], { encoding: "utf8" });

test("검증 CLI는 올바른 문제 파일에 대해 종료 코드 0을 낸다", () => {
  const r = runCli(join(QUIZ_DIR, "section02.json"));
  assert.equal(r.status, 0, r.stdout);
  assert.match(r.stdout, /통과: section02\.json/);
});

// ---------- 경계값 ----------

test("올바른 최소 샘플은 오류가 없다", () => {
  assert.deepEqual(validateQuiz(sample()), []);
});

test("1~2문제 파일은 정답 기호 쏠림 검사에서 제외된다", () => {
  const quiz = sample();
  quiz.questions.push({ ...quiz.questions[0], id: "s99-q2" });
  assert.deepEqual(validateQuiz(quiz), []);
});

test("타입 주석이 있는 코드는 실행 검사에서 제외된다", () => {
  assert.equal(runCode("let v: number = 5;"), null);
});

// ---------- 실패 케이스 ----------

test("정답이 보기에 없으면 오류", () => {
  const quiz = sample();
  quiz.questions[0].answer = "D";
  assert.ok(validateQuiz(quiz).some((e) => e.includes("정답이 보기에 없음")));
});

test("오답 보기의 wrongReasons가 빠지면 오류", () => {
  const quiz = sample();
  delete quiz.questions[0].wrongReasons.C;
  assert.ok(validateQuiz(quiz).some((e) => e.includes("wrongReasons")));
});

test("정답 보기에 wrongReasons가 있으면 오류", () => {
  const quiz = sample();
  quiz.questions[0].wrongReasons.A = "정답인데 이유가 있음";
  assert.ok(validateQuiz(quiz).some((e) => e.includes("wrongReasons")));
});

test("보기가 세 개가 아니면 오류", () => {
  const quiz = sample();
  quiz.questions[0].choices.D = "d";
  assert.ok(validateQuiz(quiz).some((e) => e.includes("A, B, C 세 개")));
});

test("id가 중복되면 오류", () => {
  const quiz = sample();
  quiz.questions.push({ ...quiz.questions[0] });
  assert.ok(validateQuiz(quiz).some((e) => e.includes("id 중복")));
});

test("필수 필드가 빠지면 오류", () => {
  const quiz = sample();
  delete quiz.questions[0].explanation;
  assert.ok(validateQuiz(quiz).some((e) => e.includes("explanation 없음")));
});

test("한자가 들어 있으면 오류", () => {
  const quiz = sample();
  quiz.questions[0].explanation = "변수 宣言";
  assert.ok(validateQuiz(quiz).some((e) => e.includes("한자")));
});

test("id가 sNN-q번호 형식이 아니면 오류", () => {
  const quiz = sample();
  quiz.questions[0].id = "q1";
  assert.ok(validateQuiz(quiz).some((e) => e.includes("형식")));
});

test("파일 이름과 section이 다르면 오류", () => {
  assert.ok(validateQuiz(sample(), "quizzes/section03.json").some((e) => e.includes("파일 이름")));
});

test("3문제 이상인데 정답이 한 기호에 몰리면 오류", () => {
  const quiz = sample();
  quiz.questions.push({ ...quiz.questions[0], id: "s99-q2" }, { ...quiz.questions[0], id: "s99-q3" });
  assert.ok(validateQuiz(quiz).some((e) => e.includes("치우침")));
});

test("실행 결과가 정답 보기와 다르면 오류", () => {
  const quiz = sample();
  quiz.questions[0].code = "console.log(1 + 1);";
  quiz.questions[0].choices.A = "3";
  assert.ok(checkOutputs(quiz).some((e) => e.includes("실행 결과")));
});

test("검증 CLI는 잘못된 파일에 대해 종료 코드 1을 낸다", () => {
  const r = runCli(join(ROOT, "package-does-not-exist.json"));
  assert.equal(r.status, 1);
  assert.match(r.stdout, /실패/);
});
