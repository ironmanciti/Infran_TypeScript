// 일반 함수: 이름과 괄호 사이
function swap<T, U>([a, b]: [T, U]): [U, T] {
  return [b, a];
}

// 화살표 함수: = 와 괄호 사이
const swap2 = <T, U>([a, b]: [T, U]): [U, T] => [b, a];

console.log(swap(["Hello", 5]));    // [ 5, 'Hello' ]
console.log(swap2(["Hello", 5]));   // [ 5, 'Hello' ]
