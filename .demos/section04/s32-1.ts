type CallbackFn = (a: number, b: number) => number;

function isValid(a: number, b: number, callback: CallbackFn): boolean {
  return callback(a, b) > 10;
}

// 익명 함수 전달
console.log(isValid(20, 40, (a, b) => a + b));   // true
console.log(isValid(2, 3, (a, b) => a - b));     // false

// 이름 있는 함수 전달
function multiply(a: number, b: number): number {
  return a * b;
}

console.log(isValid(2, 3, multiply));            // false
