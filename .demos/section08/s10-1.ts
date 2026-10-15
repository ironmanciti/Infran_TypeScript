const user = {
  id: 1,
  name: "John",
  role: "admin",
};

type User = typeof user;
// { id: number; name: string; role: string }

function getUser(): typeof user {
  return { id: 2, name: "Jane", role: "user" };
}

console.log(getUser());     // { id: 2, name: 'Jane', role: 'user' }
console.log(typeof user);   // object  (값 위치의 typeof)
