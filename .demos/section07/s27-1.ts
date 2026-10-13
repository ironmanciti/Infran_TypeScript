const map = new Map<string, number>([
  ["apple", 1],
  ["banana", 2],
]);

console.log(map.get("apple"));      // 1
console.log(map.get("kiwi"));       // undefined
map.set("orange", 99);              // 추가
map.set("banana", 7);               // 같은 키는 값을 덮어씀
console.log(map.has("apple"));      // true
console.log(map.delete("apple"));   // true
console.log(map.size);              // 2

map.forEach((value, key) => console.log(key, value));
// banana 7
// orange 99
