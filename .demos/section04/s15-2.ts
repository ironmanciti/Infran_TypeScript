let z = function (): void {
  console.log("I'm in Z");
};
z();           // I'm in Z

z = 5;
// 오류 TS2322: Type 'number' is not assignable to type '() => void'.
