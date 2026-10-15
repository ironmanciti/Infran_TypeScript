type X = { a: string; b: string };

type CustomReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

type R = CustomReadonly<X>;
// { readonly a: string;
//   readonly b: string }   ← Readonly<X>와 동일

const r: R = { a: "1", b: "2" };
console.log(r.a);   // 1
r.a = "x";
// 오류 TS2540: Readonly<X>와 같은 오류
