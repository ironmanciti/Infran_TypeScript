function subtractNumbers(a: number, b: number): number | undefined {
  if (a < b || a <= 0 || b <= 0) return;
  return a - b;
}

console.log(subtractNumbers(8, 3));    // 5
console.log(subtractNumbers(5, 5));    // 0
console.log(subtractNumbers(2, 5));    // undefined
console.log(subtractNumbers(-3, -4));  // undefined
console.log(subtractNumbers(-3, 5));   // undefined
