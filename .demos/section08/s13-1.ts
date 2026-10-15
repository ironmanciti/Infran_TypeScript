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

function updateProperty<T extends object, K extends keyof T>(
  obj: T, key: K, value: T[K]
): T {
  return { ...obj, [key]: value };
}

const result = updateProperty(user, "preferences",
  { language: "french", theme: "light" });   // 정상
console.log(result.preferences);

updateProperty(user, "preferences", {});
// 오류 TS2739: Type '{}' is missing the following properties
//   from type '{ language: ...; theme: ... }': language, theme

updateProperty(user, "role", "guest");
// 오류 TS2345: Argument of type '"guest"' is not
//   assignable to parameter of type '"user" | "admin"'.
