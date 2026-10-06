const x = 10;          // 전역
{
  const y = 20;        // 블록
  console.log(x, y);    // 둘 다 접근 가능
}
console.log(y);        // 오류: y is not defined
