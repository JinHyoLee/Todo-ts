import type { Theme } from "../types";

// 이 컴포넌트가 받는 props의 타입 정의함
interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

// ===== 라이트/다크 모드 전환 버튼 =====
// 지금 테마의 반대 모드로 바꾸는 버튼 보여줌
function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const nextLabel = theme === "light" ? "🌙 다크 모드" : "☀️ 라이트 모드";

  return (
    <button className="small-button theme-toggle" onClick={onToggle}>
      {nextLabel}
    </button>
  );
}

export default ThemeToggle;
