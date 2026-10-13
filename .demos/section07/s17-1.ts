function identity(param: any): any {
  return param;
}

const result = identity({ name: "Kim", age: 30 });
console.log(result.agee);   // 오류 없음, 실행하면 undefined
// 타입 정보가 사라져 자동 완성도 되지 않음
