type User = { id: number; username: string };
const users: User[] = [
  { id: 1, username: "kim" },
  { id: 2, username: "lee" },
];

console.log(users.length);                                // 2
console.log(users.push({ id: 3, username: "park" }));     // 3 (새 길이)
console.log(users.unshift({ id: 0, username: "choi" }));  // 4 (새 길이)

const lastRemoved = users.pop();     // User | undefined
const firstRemoved = users.shift();  // User | undefined
console.log(lastRemoved);    // { id: 3, username: 'park' }
console.log(firstRemoved);   // { id: 0, username: 'choi' }
console.log(users.length);   // 2
