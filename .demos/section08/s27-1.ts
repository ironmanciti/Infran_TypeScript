type X = {
  a: string;
  b: string;
  [key: number]: any;   // 키가 숫자인 속성은 자유롭게 추가
};

const z: X = { a: "1", b: "2", 0: "zero", 1: 100 };   // 정상
const y: X = { a: "1", b: "2" };                      // 정상
console.log(z);

const w: X = { a: "1" };
// 오류 TS2741: Property 'b' is missing in type

const v: X = { a: "1", b: "2", c: "3" };
// 오류 TS2353: Object literal may only specify known
//   properties, and 'c' does not exist in type 'X'.
