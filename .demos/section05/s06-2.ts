const user = {
  age: 20,
  print: () => {
    console.log(this.age);
  },
};

// 오류 TS2532: Object is possibly 'undefined'.
// 모듈 파일에서 화살표 함수의 this는 user가 아니라 바깥의 this(undefined)입니다.
