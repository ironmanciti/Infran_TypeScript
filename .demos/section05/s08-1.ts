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
