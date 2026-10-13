const words = [
  "spray", "limit", "elite",
  "exuberant", "destruction", "present",
];

const longestWord = words.reduce((prevLongest, currentWord) =>
  currentWord.length > prevLongest.length
    ? currentWord
    : prevLongest,
);

console.log(longestWord);   // destruction
