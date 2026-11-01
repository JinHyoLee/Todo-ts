// 이 컴포넌트가 받는 props의 타입 정의함
interface SearchBarProps {
  query: string; // 지금 입력된 검색어
  onChange: (query: string) => void;
}

// ===== 검색창 컴포넌트 =====
// 입력할 때마다 검색어를 부모(App)로 보냄. 실제로 걸러내는 건 App에서 함
function SearchBar({ query, onChange }: SearchBarProps) {
  return (
    <input
      className="search-input"
      type="search"
      placeholder="검색"
      autoComplete="off"
      value={query}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

export default SearchBar;
