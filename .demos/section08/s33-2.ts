const pages = [
  { path: "/", label: "home" },
  { path: "/dashboard", label: "dashboard" },
] as const;
// readonly [{ readonly path: "/"; readonly label: "home" },
//           { readonly path: "/dashboard"; ... }]

console.log(pages[0].label);   // "home"
pages[0].label = "x";
// 오류 TS2540: Cannot assign to 'label' because
//   it is a read-only property.
