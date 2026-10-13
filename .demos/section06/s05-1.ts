const ok: (number | string)[] = [1, "a"];
const bad: number[] | string[] = [1, "a"];
// 오류 TS2322: Type '(string | number)[]' is not assignable
//   to type 'string[] | number[]'.

console.log(ok);   // [ 1, 'a' ]
