# Section 10. 백엔드와 Express 실습

Express 서버는 npm 워크스페이스로 두 폴더에 나뉘어 있습니다.

| 폴더 | 용도 | 실행 (저장소 루트에서) | 주소 |
|---|---|---|---|
| `server/` | 강의 예제 (Hello World, 도서·사용자 API) | `npm run dev:server` | http://localhost:3000 |
| `todo-api/` | 실전 응용 문제: 할 일 API. Section 11 프로젝트의 백엔드로 그대로 사용 | `npm run dev:api` | http://localhost:3000 |

## 준비

설치는 Section 1에서 저장소 루트에서 실행한 `npm install`로 끝났습니다.
루트 `package.json`의 `workspaces`에 두 폴더가 등록되어 있어 express, zod, cors, cuid2, tsx가
루트 `node_modules`에 함께 설치됩니다. typescript는 루트의 것을 사용합니다.

두 폴더 안에서 `npm install`을 따로 실행하거나 `node_modules`를 만들지 마십시오.

## 각 폴더의 구성

```
server/
├─ package.json     dependencies와 dev·build·start·typecheck 스크립트
├─ tsconfig.json    Node.js용 설정 (NodeNext, outDir dist)
└─ src/main.ts      시작 파일
```

타입 검사: `npm run typecheck -w server`, `npm run typecheck -w todo-api`
