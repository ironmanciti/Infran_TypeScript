function doSomething(arg: any): any {
  if (Array.isArray(arg)) return arg.length;
  return arg;
}

const foo = doSomething([1, 2]) as number;
console.log(foo.toFixed(2));   // 2.00  number의 메서드 사용 가능
