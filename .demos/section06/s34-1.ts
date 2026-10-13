type Student = { name: string; age: number };
const students: Student[] = [
  { name: "John", age: 15 },
  { name: "Jane", age: 18 },
  { name: "Bob", age: 25 },
];

const areAllAdults = students.every((student) => student.age >= 18);   // false
const atLeastOneAdult = students.some((student) => student.age >= 18); // true
console.log(areAllAdults, atLeastOneAdult);   // false true
