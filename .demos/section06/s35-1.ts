type Student = { name: string; age: number };
const students: Student[] = [
  { name: "John", age: 15 },
  { name: "Jane", age: 18 },
  { name: "Bob", age: 25 },
];

const ageSum = students.reduce(
  (accumulator, student) =>
    accumulator + student.age,
  0,   // 초기값
);
// 0 → 15 → 33 → 58
console.log(ageSum);   // 58
