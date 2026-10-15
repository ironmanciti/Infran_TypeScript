function getLength<T>(o: T): T {
  console.log(o.length);
  // 오류 TS2339: Property 'length' does not
  //   exist on type 'T'.
  return o;
}

getLength("hello");  // 문자열
getLength([1, 2]);   // 배열
getLength(5);        // 숫자에는 length가 없음
