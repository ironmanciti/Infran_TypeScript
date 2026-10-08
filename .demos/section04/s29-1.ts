const greeting = ((str1: string, str2: string): string => {
  return `${str1} ${str2}`;
})("hello", "world");
console.log(greeting);   // hello world
