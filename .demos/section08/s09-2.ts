type Tuple = [number, string, "hello"];

type First = Tuple[0];   // number
type Second = Tuple[1];  // string
type Third = Tuple[2];   // "hello"

const third: Third = "hello";
console.log(third);   // hello
