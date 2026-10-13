type Person = { name: string; age: number; email: string };

const person: Person = {
  name: "John", age: 25, email: "john@gmail.com",
};

function updatePersonAge(
  p: Person, newAge: number,
): Person {
  p.age = newAge;   // 공유하는 객체 변경
  return p;
}

updatePersonAge(person, 18);
console.log(person.age);   // 18

function replacePerson(p: Person): void {
  p = { name: "Jane", age: 30,
        email: "jane@gmail.com" };
}

replacePerson(person);
console.log(person.name);   // John
