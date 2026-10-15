type Y = { readonly a: string; b: string };

type Loose<T> = {
  -readonly [P in keyof T]?: T[P];
};

type L = Loose<Y>;
// { a?: string; b?: string }

type Strict<T> = { [P in keyof T]-?: T[P] };
type S = Strict<L>;
// { a: string; b: string }   ← 다시 필수

const l: L = {};                    // 모두 선택적
const s: S = { a: "1", b: "2" };    // 모두 필수
console.log(l, s);
