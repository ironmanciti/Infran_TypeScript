class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  print(): void {
    console.log(this.name);
  }
}

const person = new Person("John", 30);
console.log(person);
// Person { name: 'John', age: 30 }
person.print();   // John
