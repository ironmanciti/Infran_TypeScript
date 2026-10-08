// 방법 1: if 문
console.log("=== if 문 방식 ===");
for (let i = 1; i <= 100; i++) {
  if (i % 15 === 0) {
    console.log("FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}

// 방법 2: 삼항 연산자
console.log("=== 삼항 연산자 방식 ===");
for (let i = 1; i <= 100; i++) {
  const result =
    i % 15 === 0 ? "FizzBuzz" : i % 3 === 0 ? "Fizz" : i % 5 === 0 ? "Buzz" : i;
  console.log(result);
}
