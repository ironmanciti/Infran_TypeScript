const user = { name: "Kim", age: 30 };

const { name, age } = user;
const { name: fullName } = user;
// 키 이름으로 꺼내고, 다른 이름도 지정 가능

console.log(name, age, fullName);   // Kim 30 Kim
