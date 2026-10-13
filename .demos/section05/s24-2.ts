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

frozen.user.id = "id-2";      // 오류 없음
console.log(frozen.user.id);  // id-2
