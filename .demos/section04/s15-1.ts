function x(): void {
  console.log("in x");
}

const y = x;   // 함수 참조
y();           // in x
