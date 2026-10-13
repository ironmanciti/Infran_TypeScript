type Student = { name: string; age: number };
const students: Student[] = [
  { name: "John", age: 15 },
  { name: "Jane", age: 18 },
  { name: "Bob", age: 25 },
];

students.forEach((student) => console.log(student.name));
students.forEach(({ name }) => console.log(name));
