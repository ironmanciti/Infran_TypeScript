type Student = { name: string; age: number };
const students: Student[] = [
  { name: "John", age: 15 },
  { name: "Jane", age: 18 },
  { name: "Bob", age: 25 },
];

const result = students.map(({ age, ...rest }) => ({
  ...rest,
  isAdult: age >= 18,
}));
console.log(result);
// [{ name: 'John', isAdult: false }, { name: 'Jane', isAdult: true },
//  { name: 'Bob', isAdult: true }]

console.log(students[0]);   // { name: 'John', age: 15 } (원본은 그대로)
