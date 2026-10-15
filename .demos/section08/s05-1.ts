function getLength<T extends string>(o: T): T {
  console.log(o.length);
  return o;
}

const value = "hello";
const result = getLength(value);  // result: "hello"
console.log(result);

getLength(5);
// 오류 TS2345: Argument of type 'number' is not
//   assignable to parameter of type 'string'.
