type User = { id: number; username: string };
const users: User[] = [];

console.log(users.push({ id: 1, username: "kim" }));  // 1 (새 길이)
console.log(users.push({ id: 2, username: "lee" }));  // 2

console.log(users[0]);   // { id: 1, username: 'kim' }
console.log(users[1]);   // { id: 2, username: 'lee' }
console.log(users[5]);   // 타입은 User, 실행 결과는 undefined
