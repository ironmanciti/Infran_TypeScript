type User = {
  status: "authenticated" | "unauthenticated";
  id: number;
  username: string;
};

const user = {
  status: "authenticated", id: 1, username: "john",
} satisfies User;

console.log(user.status);   // "authenticated"

const guest = {
  status: "guest", id: 2, username: "amy",
} satisfies User;
// 오류 TS2322: Type '"guest"' is not assignable
//   to type '"authenticated" | "unauthenticated"'.
