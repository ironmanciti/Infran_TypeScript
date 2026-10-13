const nums: readonly [string, number]
  = ["hello", 5];

nums.push("x");
// 오류 TS2339: Property 'push' does not
// exist on type 'readonly [string, number]'.
