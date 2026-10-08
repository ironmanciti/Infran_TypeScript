console.log(Boolean(false), Boolean(0), Boolean(-0), Boolean(0n));   // false false false false
console.log(Boolean(""), Boolean(null), Boolean(undefined), Boolean(NaN)); // false false false false
console.log(Boolean(true), Boolean(1), Boolean("abc"));              // true true true
