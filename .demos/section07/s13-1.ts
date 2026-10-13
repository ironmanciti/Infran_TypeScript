class Animal {
  protected name: string;
  constructor(name: string) { this.name = name; }
}

class Dog extends Animal {
  bark(): string {
    return `${this.name}: 멍멍`;   // 자식 클래스 안에서는 접근 가능
  }
}
const dog = new Dog("Max");
console.log(dog.bark());   // Max: 멍멍

const animal = new Animal("Max");
animal.name;
// 오류 TS2445: Property 'name' is protected and only accessible
//   within class 'Animal' and its subclasses.
