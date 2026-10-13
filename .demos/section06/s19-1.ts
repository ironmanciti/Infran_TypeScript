function sum(...numbers: number[]): number {
  let totalSum = 0;
  for (let i = 0; i < numbers.length; i++) {
    totalSum += numbers[i];
  }
  return totalSum;
}

const numbers = [5, 7, 8];
const numbers2 = [9, 10, 20];

console.log(numbers.concat(numbers2));   // [ 5, 7, 8, 9, 10, 20 ]
console.log([...numbers, ...numbers2]);  // [ 5, 7, 8, 9, 10, 20 ]

sum(numbers);
// 오류 TS2345: Argument of type 'number[]' is not assignable to parameter of type 'number'.
console.log(sum(...numbers));   // 20  (sum(5, 7, 8)과 같음)
