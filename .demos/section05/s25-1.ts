type User = { readonly id: string; name: string };
const user: User = { id: "id-1", name: "John" };
user.id = "id-2";
// 오류 TS2540: Cannot assign to 'id' because it is a read-only property.
console.log(user);   // { id: 'id-2', name: 'John' }
