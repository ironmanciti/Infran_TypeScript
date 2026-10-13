// 학생: 이름과 점수 배열 (점수가 하나도 없을 수 있음)
type Student = { name: string; scores: number[] };

// 학생별 결과: [이름, 평균] 형태의 읽기 전용 튜플
type Result = readonly [name: string, average: number];

// 점수 배열의 평균 (점수가 없으면 0점)
function average(scores: readonly number[]): number {
  if (scores.length === 0) return 0;
  const total = scores.reduce((sum, score) => sum + score, 0);
  return total / scores.length;
}

// 학생별 평균: 전달받은 학생 배열은 읽기만 한다
function getResults(students: readonly Student[]): readonly Result[] {
  return students.map(({ name, scores }) => [name, average(scores)] as const);
}

// 평균 60점 이상인 합격자 이름 목록
function getPassedNames(results: readonly Result[]): string[] {
  return results
    .filter(([, avg]) => avg >= 60)
    .map(([name]) => name);
}

// 평균이 가장 높은 학생 (학생이 없으면 undefined)
function getTopStudent(results: readonly Result[]): Result | undefined {
  const best = results.reduce((max, [, avg]) => (avg > max ? avg : max), -1);
  return results.find(([, avg]) => avg === best);
}

// 성적 리포트 출력
function printReport(title: string, students: readonly Student[]): void {
  const results = getResults(students);
  const passed = getPassedNames(results);
  const top = getTopStudent(results);

  console.log(`=== ${title} ===`);
  for (const [name, avg] of results) {
    console.log(`  ${name}: 평균 ${avg.toFixed(1)}점`);
  }
  console.log(`  합격자: ${passed.length > 0 ? passed.join(", ") : "없음"}`);
  if (top === undefined) {
    console.log("  최고 평균: 학생 없음");
  } else {
    const [topName, topAvg] = top;
    console.log(`  최고 평균: ${topName} (${topAvg.toFixed(1)}점)`);
  }
}

// 실행 예시
const classA: Student[] = [
  { name: "민수", scores: [90, 85, 77] },
  { name: "지영", scores: [55, 60, 48] },
  { name: "철호", scores: [] },            // 점수 없음 → 평균 0
  { name: "수진", scores: [100, 95] },
];

printReport("1반", classA);
printReport("2반 (전원 불합격)", [{ name: "하늘", scores: [40, 50] }, { name: "바다", scores: [] }]);
printReport("빈 반", []);


// spread로 학생을 추가한 새 배열을 만든다 (classA는 그대로)
const classAPlus = [...classA, { name: "영호", scores: [70] }];
printReport("1반 + 전학생", classAPlus);
console.log("원본 1반 인원:", classA.length);
