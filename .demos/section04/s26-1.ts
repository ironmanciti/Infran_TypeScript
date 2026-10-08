type ThirdFunction = () => void;
type SecondFunction = () => ThirdFunction;
type FirstFunction = () => SecondFunction;

const thirdFunction: ThirdFunction = () => console.log("third");
const secondFunction: SecondFunction = () => thirdFunction;
const firstFunction: FirstFunction = () => secondFunction;

firstFunction()()();   // third
