type Args = {
  searchValue: number;
  array: number[];
};

function contains(
  { searchValue, array }: Args): boolean {
  for (const value of array) {
    if (value === searchValue) return true;
  }
  return false;
}

const nums = [5, 7, 10];
console.log(contains({ searchValue: 5, array: nums }));   // true

// 실무에서는 includes 메서드를 사용합니다
console.log(nums.includes(7));   // true
