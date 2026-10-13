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

const adults = result.filter((student) => student.isAdult);
console.log(adults);
// [{ name: 'Jane', isAdult: true }, { name: 'Bob', isAdult: true }]
