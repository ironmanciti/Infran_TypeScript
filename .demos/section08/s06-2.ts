function sum<T extends Record<string, number>>(
  o: T
): T {
  return o;
}

console.log(sum({ a: 1, b: 2 }));   // 정상

sum({ a: "1" });
// 오류 TS2322: Type 'string' is not
//   assignable to type 'number'.
