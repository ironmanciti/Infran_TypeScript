type X = { a: string; b: string };

type MyPartial<T> = { [P in keyof T]?: T[P] };               // Partial<T> 와 동일

type Transform<T, U> = { [P in keyof T]: U };                 // 값 타입만 U로 교체

type MyPick<T, K extends keyof T> = { [P in K]: T[P] };       // keyof T 가 아니라 K 를 순회

const p: MyPartial<X> = { a: "1" };               // { a?: string; b?: string }
const t: Transform<X, boolean> = { a: true, b: false };   // { a: boolean; b: boolean }
const k: MyPick<X, "a"> = { a: "1" };              // { a: string }
console.log(p, t, k);
