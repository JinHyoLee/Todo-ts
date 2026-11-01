# Todo App (TypeScript)

React + TypeScript + Vite로 만든 할 일 목록 앱.
[JS 버전](https://github.com/JinHyoLee/Todo)을 TypeScript로 바꿔서 컴포넌트별 파일로 나누고, 기능을 더 추가함.

## 기능

- 할 일 추가 (Enter 또는 추가 버튼)
- 완료 체크 (체크하면 줄 그어짐)
- 할 일 수정 (수정 버튼 또는 내용 더블클릭, Enter 저장 / Esc 취소)
- 할 일 삭제
- 남은 할 일 개수 표시
- 새로고침해도 목록 유지 (localStorage 저장)
- 라이트 / 다크 모드 전환 (선택 저장, 처음엔 컴퓨터 설정 따라감)
- 우선순위 (높음 / 보통 / 낮음): 추가할 때 고르고, 목록에 색깔 꼬리표로 표시함
- 필터 (전체 / 진행 중 / 완료)
- 검색: 입력한 글자가 들어간 할 일만 보여줌 (대소문자 구분 안 함, 필터와 같이 쓸 수 있음)
- 완료 항목 한 번에 삭제: 완료한 할 일이 있을 때만 버튼이 보임

필터와 검색어는 저장하지 않아서 새로고침하면 "전체", 빈 검색어로 돌아감.

## 실행 방법

Node.js 18 이상 필요함 (`node -v`로 확인).

```
npm install     # 처음 한 번, 필요한 패키지 설치
npm run dev     # 개발 서버 실행 → http://localhost:5173
```

- `npm run build`: 타입 검사(tsc) 후 배포용 파일을 `dist` 폴더에 만듦

## 파일 구조

```
index.html                  화면 뼈대, src/main.tsx 연결
package.json                사용하는 패키지와 명령어
tsconfig.json               TypeScript 설정 (strict 모드)
vite.config.ts              Vite 설정
src/
  main.tsx                  시작점, App을 #root에 그림
  App.tsx                   할 일 목록, 필터, 검색어, 테마 상태 관리, 저장
  types.ts                  Todo, Priority, Filter, Theme 타입 정의
  style.css                 디자인 (색은 CSS 변수로 관리)
  components/
    TodoForm.tsx            할 일 입력창 + 우선순위 선택
    TodoItem.tsx            할 일 한 줄 (보기 모드 / 수정 모드)
    SearchBar.tsx           검색창
    FilterTabs.tsx          전체 / 진행 중 / 완료 탭
    ThemeToggle.tsx         라이트 / 다크 모드 전환 버튼
```

## 필터, 검색 동작 방식

- 저장된 목록(`todos`)은 건드리지 않고, 화면에 보여줄 목록(`visibleTodos`)만 따로 계산함
- 필터로 먼저 거르고, 그 결과를 검색어로 한 번 더 거름
- 결과가 없으면 검색 중일 때는 "검색 결과가 없어요.", 아니면 "해당하는 할 일이 없어요." 표시함

## 우선순위 추가하면서 바뀐 점

- `Todo`에 `priority` 필드를 추가함. 타입을 바꾸면 고쳐야 할 곳을 TS가 에러로 알려줌
- 우선순위 기능 넣기 전에 저장된 할 일에는 `priority`가 없어서, 불러올 때 "보통"으로 채움 (`App.tsx`의 `loadTodos`)
- 화면에 보여줄 글자는 `PRIORITY_LABELS`(`Record<Priority, string>`)에 모아둠. 값 하나를 빠뜨리면 TS가 에러로 알려줌

## 다크 모드 동작 방식

1. `App.tsx`가 테마 상태(`"light" | "dark"`)를 가지고, 바뀌면 `<html data-theme="dark">`처럼 표시함
2. `style.css`는 색을 `--bg`, `--text` 같은 변수로 정의하고, `[data-theme="dark"]`일 때 변수 값만 바꿈
3. `index.html`의 작은 스크립트가 화면 그리기 전에 테마를 먼저 적용해서, 새로고침할 때 밝은 화면이 번쩍이지 않게 함

## JS 버전에서 바뀐 점

- `interface Todo`로 할 일의 모양(id, text, done, priority)을 정의하고 여러 파일에서 같이 씀
- 컴포넌트마다 `Props` 인터페이스로 받는 값의 타입을 정함
- `useState<Todo[]>`처럼 상태에 타입을 붙임
- 이벤트에 `FormEvent<HTMLFormElement>`, `KeyboardEvent<HTMLInputElement>` 타입을 붙임
- `document.getElementById`가 `null`일 수 있는 경우를 처리함
- CDN 대신 npm으로 React를 설치하고, Vite가 TS를 JS로 바꿔서 실행함





https://github.com/user-attachments/assets/b405a7b7-ebdf-468e-ae18-45578d0eb4c0



