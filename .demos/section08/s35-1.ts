type Page = { path: string; label: string };

const pages = [
  { path: "/", label: "home" },
  { path: "/dashboard", label: "dashboard" },
] as const satisfies Page[];

console.log(pages[1].label);   // "dashboard"  ← 구체적인 타입
pages[1].label = "x";          // 오류: 읽기 전용

const bad = [{ path: "/" }] as const satisfies Page[];
// 오류 TS2741: Property 'label' is missing
