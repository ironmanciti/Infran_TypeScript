// 앱 설정 관리자: 섹션 8 (제네릭 제약, keyof, 인덱스 접근, Partial/Omit, 매핑 타입, as const satisfies)

type Settings = {
  theme: "light" | "dark";
  language: "ko" | "en";
  fontSize: number;
  notifications: { email: boolean; push: boolean };
};

// as const 로 리터럴 타입을 유지하고, satisfies 로 Settings 모양인지 검사한다
const defaultSettings = {
  theme: "light",
  language: "ko",
  fontSize: 14,
  notifications: { email: true, push: false },
} as const satisfies Settings;

// K 는 T 의 키 중 하나, value 는 그 키에 해당하는 속성 타입(T[K])이어야 한다
function updateSetting<T extends object, K extends keyof T>(obj: T, key: K, value: T[K]): T {
  return { ...obj, [key]: value };
}

// Partial<Settings> 이므로 바꾸고 싶은 속성만 전달하면 된다
function mergeSettings(base: Settings, patch: Partial<Settings>): Settings {
  return { ...base, ...patch };
}

// 매핑 타입: 모든 속성에 readonly 수정자를 추가한다 (Readonly<T> 와 동일)
type Frozen<T> = { readonly [P in keyof T]: T[P] };

// 저장용 설정: notifications 를 제외하고 전부 읽기 전용
type StoredSettings = Frozen<Omit<Settings, "notifications">>;
// { readonly theme: "light" | "dark"; readonly language: "ko" | "en"; readonly fontSize: number }

// ---- 실행 ----
// as const 로 만든 defaultSettings 는 theme 가 "light" 리터럴 타입이라 T[K] 도 "light" 로 좁혀진다.
// 그래서 넓은 Settings 타입의 변수로 옮긴 뒤 수정한다.
const current: Settings = defaultSettings;

const s1 = updateSetting(current, "theme", "dark");
console.log("theme 변경:", s1.theme);                     // dark

const s2 = updateSetting(s1, "notifications", { email: false, push: true });
console.log("notifications 변경:", s2.notifications);     // { email: false, push: true }

const merged = mergeSettings(s2, { fontSize: 18, language: "en" });
console.log("병합 결과:", merged);

const stored: StoredSettings = { theme: merged.theme, language: merged.language, fontSize: merged.fontSize };
console.log("저장용 설정:", stored);

// ---- 오류 예 (주석을 풀면 TypeScript 오류) ----
// updateSetting(defaultSettings, "theme", "dark");
// 오류 TS2345: Argument of type '"dark"' is not assignable to parameter of type '"light"'
//   (as const 때문에 T[K] 가 "light" 로 좁혀짐)

// updateSetting(current, "color", "red");
// 오류 TS2345: Argument of type '"color"' is not assignable to parameter of type 'keyof Settings'

// updateSetting(current, "fontSize", "big");
// 오류 TS2345: Argument of type 'string' is not assignable to parameter of type 'number'

// updateSetting(current, "theme", "blue");
// 오류 TS2345: Argument of type '"blue"' is not assignable to parameter of type '"dark" | "light"'

// mergeSettings(defaultSettings, { fontSize: "big" });
// 오류 TS2322: Type 'string' is not assignable to type 'number'

// stored.theme = "dark";
// 오류 TS2540: Cannot assign to 'theme' because it is a read-only property

// const bad: StoredSettings = { ...stored, notifications: { email: true, push: true } };
// 오류 TS2353: Object literal may only specify known properties, and 'notifications' does not exist in type 'Frozen<Omit<Settings, "notifications">>'

// const wrongDefault = { theme: "blue", language: "ko", fontSize: 14,
//                        notifications: { email: true, push: false } } as const satisfies Settings;
// 오류 TS2322: Type '"blue"' is not assignable to type '"dark" | "light"'
