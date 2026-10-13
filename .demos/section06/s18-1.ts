function sum(...numbers: number[]): number {
  let totalSum = 0;
  for (let i = 0; i < numbers.length; i++) {
    totalSum += numbers[i];
  }
  return totalSum;
}
console.log(sum(1, 2, 3));   // 6
