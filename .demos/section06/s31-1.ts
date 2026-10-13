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

const firstAdult = result.find((student) => student.isAdult);
console.log(firstAdult);
// { name: 'Jane', isAdult: true }    타입: { name: string; isAdult: boolean } | undefined

console.log(students.findIndex((student) => student.name === "Bob"));   // 2
console.log(students.findIndex((student) => student.name === "Tom"));   // -1
