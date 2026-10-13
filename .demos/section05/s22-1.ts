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
  user: { id: "id-1", name: "John", role: { hasAllPermissions: true } },
};

session.user.role;
// 오류 TS18048: 'session.user'
// is possibly 'undefined'.

console.log(session.user!.role);   // 오류 없음
// { hasAllPermissions: true }
