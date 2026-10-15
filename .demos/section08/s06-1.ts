function copy<T extends object>(o: T): T {
  return { ...o };
}

const result = copy({ name: "John" });
// result: { name: string }
console.log(result);

copy("hello");
// 오류 TS2345: Argument of type 'string' is
//   not assignable to parameter of type 'object'.
