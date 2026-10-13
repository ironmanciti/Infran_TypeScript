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

session.user!.role!.hasAllPermissions;
// TypeError: Cannot read properties
// of undefined
