const nameInput = "";

// 권장하지 않음
if (nameInput) {
  console.log("이름이 입력되었습니다");
}

// 권장
if (nameInput !== "") {
  console.log("이름이 입력되었습니다");
}
