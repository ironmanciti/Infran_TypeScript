const nums = [3, 1, 2];

// 새 배열을 반환: 원본 유지
const sorted = nums.toSorted();
console.log(sorted, nums);   // [ 1, 2, 3 ] [ 3, 1, 2 ]

// 원본을 변경
nums.sort();
console.log(nums);           // [ 1, 2, 3 ]
