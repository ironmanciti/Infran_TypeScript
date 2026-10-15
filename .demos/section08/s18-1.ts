type User = { displayName: string; email: number };
type Credentials = { email: string; password: string };

type Info = User & Credentials;
// { displayName: string; email: never; password: string }

const info: Info = { displayName: "John",
  email: "john@gmail.com", password: "1234" };
// 오류 TS2322: Type 'string' is not assignable to type 'never'.
