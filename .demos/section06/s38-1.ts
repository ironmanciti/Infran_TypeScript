const obj = { a: 1, b: 2, c: 3 };

for (const v of obj) {}
// 오류 TS2488: must have a '[Symbol.iterator]()'
// 실행하면 TypeError: obj is not iterable
