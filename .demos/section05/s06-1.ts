const user = {
  name: "John",
  age: 20,
  print() {
    console.log(this.age);
  },
};

user.print();   // 20
