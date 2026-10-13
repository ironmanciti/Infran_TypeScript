const user = { firstName: "John", lastName: "Doe", age: 30 };
const secondUser = { firstName: "Second", lastName: "User", age: 25 };

const { firstName } = user;
console.log(firstName);   // John

// const { firstName } = secondUser;
// 오류 TS2451: Cannot redeclare
// block-scoped variable 'firstName'.

const { firstName: secondName } = secondUser;
console.log(secondName);  // Second
