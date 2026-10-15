type RemoveReadonly<T> = {
  -readonly [P in keyof T]: T[P];
};

type Y = { readonly a: string; b: string };
type M = RemoveReadonly<Y>;
// { a: string; b: string }

const m: M = { a: "1", b: "2" };
m.a = "x";   // 정상
console.log(m);   // { a: 'x', b: '2' }
