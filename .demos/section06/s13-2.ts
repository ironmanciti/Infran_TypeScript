type ReadonlyTuple = readonly [string, number];
const nums: ReadonlyTuple = ["hello", 5];

const [aString, aNumber] = nums;
console.log(aString, aNumber);  // hello 5
