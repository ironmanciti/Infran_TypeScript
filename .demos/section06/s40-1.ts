type NewStudent = { name: string; isAdult: boolean };
const students: NewStudent[] = [
  { name: "John", isAdult: false },
  { name: "Jane", isAdult: true },
  { name: "Bob", isAdult: true },
];

function findFirstAdult(
  students: NewStudent[]): NewStudent | undefined {
  for (const student of students) {
    if (student.isAdult) return student;
  }
  return undefined;
}

function filterMinors(students: NewStudent[]): NewStudent[] {
  const filteredStudents: NewStudent[] = [];
  for (const student of students) {
    if (student.isAdult) filteredStudents.push(student);
  }
  return filteredStudents;
}

console.log(findFirstAdult(students));
console.log(students.find((student) => student.isAdult));
console.log(filterMinors(students));
console.log(students.filter((student) => student.isAdult));
