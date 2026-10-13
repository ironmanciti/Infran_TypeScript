type User = {
  name: string;
  age: number;
  email: string;
  phoneNumber?: string;   // 선택적 속성
};
const user: User = {
  name: "John", age: 20, email: "john@email.com",
};
if (user.age >= 18) {
  user.phoneNumber = "123-456-7890";
}

if (user.phoneNumber !== undefined) {
  console.log(user.phoneNumber.length);   // 12
}

console.log(user.age);   // 20
user.age = 15;           // 수정
console.log(user.age);   // 15

delete user.phoneNumber;   // 가능

delete user.name;
// 오류 TS2790: The operand of a
// 'delete' operator must be optional.
