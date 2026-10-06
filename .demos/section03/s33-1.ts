let grade = "B";
switch (grade) {
  case "A":
    console.log("축하합니다");
    break;
  case "F":
    console.log("더 노력하세요");
    break;
  case "B": case "C": case "D":
    console.log("잘했습니다");
    break;
  default:
    console.log("유효하지 않은 성적");
}
