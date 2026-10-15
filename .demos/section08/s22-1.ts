type User = { id: number; name: string;
              email: string; password: string };

type UserWithoutPassword = Omit<User, "password">;
// { id: number; name: string; email: string }

type PublicUser = Omit<User, "password" | "email">;
// { id: number; name: string }

type UserSummary = Pick<User, "id" | "name">;
// { id: number; name: string }

const s: UserSummary = { id: 1, name: "John" };
console.log(s);

const s2: UserSummary = { id: 1, name: "John",
                          email: "x" };
// 오류 TS2353: Object literal may only specify
//   known properties, and 'email' does not
//   exist in type 'UserSummary'.
