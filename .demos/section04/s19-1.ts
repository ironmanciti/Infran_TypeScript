const anonymous = function (a: number): number {
  return a * 2;
};
const arrow = (a: number): number => a * 2;

console.log(anonymous(3));  // 6
console.log(arrow(3));      // 6
