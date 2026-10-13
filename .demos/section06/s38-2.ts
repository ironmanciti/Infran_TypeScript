const obj = { a: 1, b: 2, c: 3 };

for (const key in obj) console.log(key);  // a b c

Object.entries(obj).forEach(([key, value]) =>
  console.log(key, value));               // a 1 ...

console.log(Object.keys(obj));      // [ 'a', 'b', 'c' ]
console.log(Object.values(obj));    // [ 1, 2, 3 ]
console.log(Object.entries(obj));   // [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]
