# Section 9. DOM 조작 실습

Section 9는 브라우저에서 동작하는 코드를 다룹니다. 지금까지 `playground/`에서
`node`로 실행하던 방식과 달리, 이 폴더의 실습은 브라우저에서 확인합니다.

## 폴더 구성

| 폴더 | 강의 | 실행 방법 | 배포 여부 |
|---|---|---|---|
| `dom-basic/` | 85~92강 | VS Code Live Server | 배포됨 (`index.html`) |
| `dom-vite/` | 93~97강 | `npm run dev` (Vite) | 93강에서 직접 만듦 |
| `dom-todo/` | 실전 응용 문제 | `npm run dev` (Vite) | 직접 만듦 |

`dom-vite/`와 `dom-todo/`는 Git에서 제외되어 있으므로 각자 로컬에서 만듭니다.

## dom-basic (85~92강)

1. VS Code 확장 **Live Server**를 설치합니다.
2. `web/dom-basic/index.html`에서 마우스 오른쪽 버튼 → **Open with Live Server**.
3. 브라우저에서 `http://localhost:5500/web/dom-basic/index.html`이 열립니다.
4. 86~91강은 `index.html`의 `head`에 `<script>`를 넣어 진행하고,
   92강에서 그 내용을 `script.js`로 분리합니다.

## dom-vite (93~97강)

터미널에서 `web` 폴더로 이동한 뒤 Vite 프로젝트를 만듭니다.

```bash
cd web
npm create vite@latest dom-vite
```

프롬프트에서 **Vanilla** → **TypeScript**를 선택하고, 설치·실행은 **No**를 고릅니다.
이어서 직접 설치하고 실행합니다.

```bash
cd dom-vite
npm install
npm run dev
```

`http://localhost:5173`에서 샘플 앱을 확인한 뒤, 93강 안내대로
`dom-basic/index.html`의 내용을 옮기고 `src/main.ts`부터 작성합니다.

## dom-todo (실전 응용 문제)

`dom-vite`와 같은 방법으로 `web/dom-todo` 프로젝트를 새로 만들어 진행합니다.
