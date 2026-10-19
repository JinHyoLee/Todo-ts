import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./style.css";

// index.html의 <div id="root"> 가져옴
// 없으면 앱을 그릴 수 없으므로 에러 냄 (TS가 null일 수도 있다고 알려주는 부분)
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("#root 요소가 없음");
}

// StrictMode: 개발 중 실수를 찾기 쉽게 추가 검사함
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
