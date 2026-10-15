type User = {
  status: "authenticated" | "unauthenticated";
  id: number;
  username: string;
};

const user: User = { status: "authenticated",
                     id: 1, username: "john" };

console.log(user.status);
// "authenticated" | "unauthenticated"
