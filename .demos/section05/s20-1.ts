const userName: string = "";
const count: number = 0;
console.log(userName || "이름 없음", count || 10);   // 이름 없음 10
console.log(userName ?? "이름 없음", count ?? 10);   // (빈 문자열) 0
