function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const [user, count] = pair({ name: "Kim" }, 5);
// user: { name: string }
// count: number
console.log(user, count);   // { name: 'Kim' } 5
