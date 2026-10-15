type User = { displayName: string; admin: boolean };
type Credentials = { email: string; password: string };

function getUserInfo(user: User, credentials: Credentials)
  : User & Credentials {
  return { ...user, ...credentials };
}
// 반환 타입: { displayName: string; admin: boolean;
//             email: string; password: string }

console.log(getUserInfo(
  { displayName: "John", admin: false },
  { email: "john@gmail.com", password: "1234" },
));

const bad: User & Credentials = { displayName: "John", admin: false };
// 오류 TS2322: Type '{ displayName: string; admin: false; }' is
//   missing the following properties from type 'Credentials':
//   email, password
