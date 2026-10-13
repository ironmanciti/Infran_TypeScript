const person = { name: "Kim", age: 30,
                 city: "Seoul" };

const { age, ...others } = person;
console.log(others);   // { name: 'Kim', city: 'Seoul' }
