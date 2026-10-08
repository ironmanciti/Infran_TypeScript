function subtractNumbers(a: number, b: number): number | undefined {
  if (a < b || a <= 0 || b <= 0) return;
  return a - b;
}

console.log(subtractNumbers(8, 3));  // 5
