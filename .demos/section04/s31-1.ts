type CallbackFn = (a: number, b: number) => number;

function isValid(a: number, b: number, callback: CallbackFn): boolean {
  return callback(a, b) > 10;
}

console.log(isValid(20, 40, (a, b) => a + b));   // true
