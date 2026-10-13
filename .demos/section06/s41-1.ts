type Student = { name: string; age: number };
const students: Student[] = [
  { name: "John", age: 15 },
  { name: "Jane", age: 18 },
  { name: "Bob", age: 25 },
];

function every(students: Student[]): boolean {
  for (const student of students) {
    if (student.age < 18) return false;
  }
  return true;
}

function some(students: Student[]): boolean {
  for (const student of students) {
    if (student.age >= 18) return true;
  }
  return false;
}
console.log(every(students), some(students));   // false true
console.log(students.every((student) => student.age >= 18),
            students.some((student) => student.age >= 18));   // false true
