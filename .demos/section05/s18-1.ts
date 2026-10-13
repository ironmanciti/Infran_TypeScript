type User = {
  id: string;
  name: string;
  role?: { hasAllPermissions: boolean };
};

type Session = {
  status: "authenticated" | "unauthenticated";
  user?: User;
};

const session: Session = {
  status: "authenticated",
  user: { id: "id-1", name: "John" },
};

let hasPermissions = false;

if (session.user !== undefined) {
  if (session.user.role !== undefined) {
    hasPermissions =
      session.user.role.hasAllPermissions;
  }
}

console.log(hasPermissions);   // false
