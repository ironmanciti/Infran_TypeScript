const a = new Set([1, 2, 3]);
const b = new Set([2, 3, 4]);

console.log(a.union(b));          // Set(4) { 1, 2, 3, 4 }
console.log(a.intersection(b));   // Set(2) { 2, 3 }
console.log(a.difference(b));     // Set(1) { 1 }

a.clear();                        // 모두 삭제
console.log(a.size);              // 0
