type Flags = Record<string, boolean>;

const f: Flags = { darkMode: true };
console.log(f);

const g: Flags = { darkMode: 1 };
// 오류 TS2322: Type 'number' is not
//   assignable to type 'boolean'.
