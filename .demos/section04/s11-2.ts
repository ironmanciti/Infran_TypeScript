function printLength(text: string | undefined) {
  if (text === undefined) return;
  console.log(text.length);   // text: string
}

printLength("Hello");     // 5
printLength(undefined);   // 출력 없음
