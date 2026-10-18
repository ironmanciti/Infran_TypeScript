# Section 9. DOM 조작 실습

브라우저에서 동작하는 코드를 다룹니다. 섹션 2~8의 `playground/`와 달리
Vite 개발 서버로 실행하고 브라우저에서 확인합니다.

## 준비

설치는 Section 1에서 저장소 루트에서 실행한 `npm install`로 끝났습니다.
루트 `package.json`에 typescript와 vite가 함께 기록되어 있어 따로 설치할 것이 없습니다.

## 실행 (저장소 루트에서)

| 명령 | 대상 | 주소 |
|---|---|---|
| `npm run dev` | `web/dom-vite/` (85~90강) | http://localhost:5173 |
| `npm run dev:csr` | `web/dom-csr/` (91~92강) | http://localhost:5173 |
| `npm run dev:todo` | `web/dom-todo/` (실전 응용 문제) | http://localhost:5173 |

파일을 저장하면 브라우저가 자동으로 갱신됩니다. 종료는 터미널에서 `q` 또는 Ctrl+C.

## 폴더 구성

```
web/
├─ dom-vite/
│  ├─ index.html        # 85~90강 템플릿 (form + input 4개 + p 3개, Tailwind CDN)
│  ├─ tsconfig.json     # DOM 타입, bundler 모드
│  └─ src/
│     ├─ main.ts        # 이번 섹션의 코드 (처음에는 비어 있음)
│     └─ vite-env.d.ts
├─ dom-csr/            # 91~92강: 클라이언트 사이드 렌더링과 모듈
│  ├─ index.html        # form이 없는 템플릿 (p 3개만). form은 코드로 만듦
│  ├─ tsconfig.json     # dom-vite 설정을 그대로 사용
│  └─ src/main.ts
└─ dom-todo/
   ├─ index.html        # 할 일 목록 템플릿 (form + ul)
   ├─ tsconfig.json
   └─ src/main.ts
```

`package.json`과 `node_modules`는 루트의 것을 공유합니다. 이 폴더 안에 따로 만들지 마십시오.
