type User = { id: string; name: string };

type Session = {
  status: "authenticated" | "unauthenticated";
  user: User;
};

const session: Session = {
  status: "authenticated",
  user: { id: "id-1", name: "John" },
};

const frozen = Object.freeze(session);

frozen.status = "unauthenticated";
// 오류 TS2540: Cannot assign to 'status'
// because it is a read-only property.
// 실행하면 TypeError: Cannot assign to read only property 'status'
