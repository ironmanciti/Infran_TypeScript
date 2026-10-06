let number = 1;
while (number <= 10) {
  if (number === 4) break;
  if (number % 2 === 0) {
    number++;
    continue;
  }
  console.log(number);  // 1, 3
  number++;
}
