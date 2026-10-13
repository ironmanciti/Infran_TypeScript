const words = ["hello", "world", "!"];

const [first, ...rest] = words;
console.log(first);   // hello
console.log(rest);    // [ 'world', '!' ]
