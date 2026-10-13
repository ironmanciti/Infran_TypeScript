type NumberArray = number[];

const array: (number | NumberArray)[] = [1, 2, [5, 6]];

const array2 = [1, 2, [5, 6, [7]]];
// (number | (number | number[])[])[]

console.log(array);    // [ 1, 2, [ 5, 6 ] ]
console.log(array2);   // [ 1, 2, [ 5, 6, [ 7 ] ] ]
