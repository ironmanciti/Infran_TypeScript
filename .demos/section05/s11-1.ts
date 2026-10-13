type Person = { name: string; age: number; email: string };

const person: Person = {
  name: "John", age: 25, email: "john@gmail.com",
};
function updatePersonAge(
  p: Person, newAge: number,
): Person {
  p.age = newAge;
  return p;
}
console.log(updatePersonAge(person, 18).age);  // 18
console.log(person.age);                       // 18
