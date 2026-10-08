function addNumbers(a: number, b: number): number {
  const result = a + b;
  return result;
}

console.log(addNumbers);        // [Function: addNumbers]
console.log(addNumbers(1, 2));  // 3

console.log(addNumbers(2));     // NaN
// 오류 TS2554: Expected 2 arguments, but got 1.
