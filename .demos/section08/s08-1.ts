type User = {
  id: number;
  preferences: {
    language: "english" | "spanish" | "french";
    theme: "dark" | "light";
  };
  role: "admin" | "user";
  addresses: { street: string; city: string; zipCode: string }[];
};

function setLanguage(lang: User["preferences"]["language"]) {
  // lang: "english" | "spanish" | "french"
  console.log(lang);
}

setLanguage("french");   // 정상
setLanguage("korean");
// 오류 TS2345: Argument of type '"korean"' is not assignable
//   to parameter of type '"english" | "spanish" | "french"'.
