function doSomething(arg: any): any {
  if (Array.isArray(arg)) return arg.length;
  return arg;
}

const bar = doSomething({}) as number;
bar.toFixed(2);
// 실행 시 오류: bar.toFixed is not a function

"hello" as number;   // 오류 TS2352: 겹치지 않는 타입
