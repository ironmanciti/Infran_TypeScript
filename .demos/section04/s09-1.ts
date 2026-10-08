function subtractNumbers(a: number, b: number): number | undefined {
  if (a > b) {
    if (a > 0 && b > 0) {
      return a - b;
    }
  }
  return undefined;
}

console.log(subtractNumbers(8, 3));  // 5
