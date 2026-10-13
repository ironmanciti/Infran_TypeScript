type Student = { name: string; age: number };
const students: Student[] = [
  { name: "John", age: 15 },
  { name: "Jane", age: 18 },
  { name: "Bob", age: 25 },
];

const ageSum = students.reduce(
  (accumulator, student) =>
    accumulator + student.age,
);
// 오류 TS2365: Operator '+' cannot be
// applied to types 'Student' and 'number'.
