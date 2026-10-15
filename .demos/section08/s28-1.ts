type X = { a: string; b: string };

type R = Readonly<X>;
// { readonly a: string;
//   readonly b: string }

const r: R = { a: "1", b: "2" };
console.log(r.a);   // 1
r.a = "x";
// 오류 TS2540: Cannot assign to 'a'
//   because it is a read-only property.
