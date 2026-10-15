type User = { id: number; name: string;
              email: string; password: string };

function removeEmptyProperties<T extends object>(obj: T): Partial<T> {
  const result: Partial<T> = { ...obj };
  for (const key in result) {
    if (result[key] === "" || result[key] === -1) delete result[key];
  }
  return result;
}

const user = removeEmptyProperties({ id: -1, name: "John", email: "" });
// user: { id?: number; name?: string; email?: string }
console.log(user);   // { name: 'John' }

type PartialUser = Partial<User>;      // 모든 속성이 선택적
type RequiredUser = Required<PartialUser>;  // 다시 모두 필수
