function contains(searchValue: number,
                  array: number[]): boolean {
  for (const value of array) {
    if (value === searchValue) return true;
  }
  return false;
}
console.log(contains(5, [5, 7, 10]));   // true
console.log(contains(4, [5, 7, 10]));   // false
