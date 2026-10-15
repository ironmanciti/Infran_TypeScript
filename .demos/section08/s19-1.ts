type User = { displayName: string; email: { primary: string } };
type Credentials = { email: string; password: string };

type Info = User & Credentials;
// email: string & { primary: string }

const email = Object.assign("john@gmail.com", { primary: "hello" });
// email: string & { primary: string }

const info: Info = { displayName: "John", email, password: "1234" };
console.log(info.email.primary);   // hello
console.log(typeof info.email);    // object (String 래퍼 객체)
