function double(a: number): number | undefined {
  if (a === 0) return undefined;
  return a * 2;
}

console.log(double(2));  // 4
console.log(double(0));  // undefined
