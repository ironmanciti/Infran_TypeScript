function regularFunction(): () => void {
  return function () {
    console.log("in returned function");
  };
}

const returned = regularFunction();
returned();          // 권장
regularFunction()(); // 연속 호출
