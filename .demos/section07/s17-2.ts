function identity<T>(param: T): T {
  return param;
}

const result = identity({ name: "Kim", age: 30 });
// T는 { name: string; age: number }로 추론
result.agee;   // 오류 TS2551: Property 'agee'
//   does not exist ... Did you mean 'age'?

console.log(result.age);   // 30
