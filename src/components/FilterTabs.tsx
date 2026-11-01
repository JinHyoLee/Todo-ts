import type { Filter } from "../types";

// 이 컴포넌트가 받는 props의 타입 정의함
interface FilterTabsProps {
  filter: Filter; // 지금 고른 필터
  onChange: (filter: Filter) => void;
}

// 탭 목록. 화면에 보여줄 순서대로 둠
const TABS: { value: Filter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "active", label: "진행 중" },
  { value: "done", label: "완료" },
];

// ===== 필터 탭 컴포넌트 =====
// 전체 / 진행 중 / 완료 중 하나 고름. 고른 탭은 active 클래스로 강조함
function FilterTabs({ filter, onChange }: FilterTabsProps) {
  return (
    <div className="filter-tabs">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          className={tab.value === filter ? "small-button filter-tab active" : "small-button filter-tab"}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default FilterTabs;
