const numbers = [1, 2, 3];          // number[]
const mixed = [1, "a", true];
// (string | number | boolean)[]
console.log(numbers, mixed);

const empty = [];
console.log(empty);
// 오류: 빈 배열은 타입을 추론할 수 없어 암묵적으로 any[]가 됩니다
