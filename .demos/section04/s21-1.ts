const add: (a: number, b: number) => number = (a, b) => a + b;

const subtract: (a: number, b: number) => number = function (a, b) {
  return a - b;
};
console.log(subtract(3, 4));   // -1
