type User = {
  id: number;
  name: string;
  preferences: { language: "english" | "spanish" | "french";
                 theme: "dark" | "light" };
  role: "admin" | "user";
};

const user: User = {
  id: 1,
  name: "John",
  preferences: { language: "english", theme: "dark" },
  role: "admin",
};

type UserKeys = keyof User;
// "id" | "name" | "preferences" | "role"

function updateProperty(obj: User, key: keyof User, value: any) {
  return { ...obj, [key]: value };
}

console.log(updateProperty(user, "preferences", {}));   // 정상
updateProperty(user, "preference", {});
// 오류 TS2345: Argument of type '"preference"' is not
//   assignable to parameter of type 'keyof User'.
