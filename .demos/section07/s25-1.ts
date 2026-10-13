const set = new Set([1, 2, 3, 3]);
console.log(set);                // Set(3) { 1, 2, 3 }

set.add(4);                      // 추가
set.add(4);                      // 이미 있으면 무시
console.log(set.has(3));         // true
console.log(set.delete(4));      // true (삭제됨)
console.log(set.delete(9));      // false (없음)
console.log(set.size);           // 3

// 배열의 중복 제거
const unique = [...new Set([1, 1, 2])];
console.log(unique);             // [ 1, 2 ]
