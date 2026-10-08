function subtractNumbers(a: number, b: number): number | undefined {
  if (typeof a !== "number" || typeof b !== "number") return;
  if (a < b || a <= 0 || b <= 0) return;
  return a - b;
}

console.log(subtractNumbers(8, 3));    // 5
console.log(subtractNumbers("8", 3));  // undefined
// 오류 TS2345: 문자열을 전달하면 타입 오류가 나지만 실행은 됩니다
