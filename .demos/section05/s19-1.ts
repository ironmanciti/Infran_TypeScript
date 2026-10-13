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

// 옵셔널 체이닝: boolean | undefined
const checked = session.user?.role?.hasAllPermissions;
console.log(checked);          // undefined

// 널 병합 연산자: boolean
const hasPermissions = session.user?.role?.hasAllPermissions ?? false;
console.log(hasPermissions);   // false
