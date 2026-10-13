const subtract = function (a, b) {
    return a - b;
};
// 오류 TS2322: Type '(a: string, b: number) => number' is not assignable
//   to type '(a: number, b: number) => number'.
console.log(subtract(5, 3)); // This will cause a type error because the function signature does not match the expected type.
export {};
