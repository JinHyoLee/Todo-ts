import { useState, useEffect } from "react";
import type { Todo, Theme, Filter, Priority } from "./types";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import ThemeToggle from "./components/ThemeToggle";
import FilterTabs from "./components/FilterTabs";
import SearchBar from "./components/SearchBar";

// localStorage에 저장할 때 쓰는 이름
const STORAGE_KEY = "todos";
const THEME_KEY = "theme";

// 저장된 테마 불러옴. 없으면 컴퓨터(OS) 설정 따라감
function loadTheme(): Theme {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") {
    return saved;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// 우선순위 기능 넣기 전에 저장된 할 일은 priority가 없음
// 그래서 priority를 "있을 수도 없을 수도 있는(?)" 값으로 보고 읽어옴
type SavedTodo = Omit<Todo, "priority"> & { priority?: Priority };

// 저장된 목록 불러옴. 없거나 깨져 있으면 빈 배열
function loadTodos(): Todo[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return [];
  }
  try {
    const parsed = JSON.parse(saved) as SavedTodo[];
    // priority 없는 예전 할 일은 "보통"으로 채움
    return parsed.map((todo) => ({ ...todo, priority: todo.priority ?? "medium" }));
  } catch {
    return [];
  }
}

// ===== 전체 앱 컴포넌트 =====
// 할 일 목록 데이터를 여기서 관리하고, 자식 컴포넌트에 props로 내려줌
function App() {
  // 할 일 목록. <Todo[]>로 "Todo 배열"이라고 타입 지정함
  const [todos, setTodos] = useState<Todo[]>(loadTodos);

  // 지금 고른 필터, 검색어 (저장 안 함. 새로고침하면 처음 상태로 돌아감)
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  // todos가 바뀔 때마다 localStorage에 자동 저장함
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // 화면 테마 ("light" 또는 "dark")
  const [theme, setTheme] = useState<Theme>(loadTheme);

  // theme이 바뀌면 <html data-theme="..."> 바꾸고 저장함
  // CSS가 data-theme 값을 보고 색을 바꿈
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // 라이트 ↔ 다크 전환
  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  // 추가
  function addTodo(text: string, priority: Priority) {
    const newTodo: Todo = { id: Date.now(), text, done: false, priority };
    setTodos([...todos, newTodo]);
  }

  // 완료 체크 전환
  function toggleTodo(id: number) {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  }

  // 삭제
  function deleteTodo(id: number) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  // 내용 수정
  function editTodo(id: number, newText: string) {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)));
  }

  // 완료한 할 일 한 번에 삭제 (완료 안 한 것만 남김)
  function clearDone() {
    setTodos(todos.filter((todo) => !todo.done));
  }

  // 화면에 보여줄 목록: 필터 → 검색 순서로 걸러냄
  // 저장된 todos는 그대로 두고, 보여줄 것만 따로 계산함
  const keyword = query.trim().toLowerCase();
  const visibleTodos = todos
    .filter((todo) => {
      if (filter === "active") return !todo.done;
      if (filter === "done") return todo.done;
      return true; // "all"
    })
    .filter((todo) => todo.text.toLowerCase().includes(keyword)); // 대소문자 구분 안 함

  // 남은(완료 안 한) 할 일 개수, 완료한 할 일 개수. todos가 바뀌면 자동으로 다시 계산됨
  const remaining = todos.filter((todo) => !todo.done).length;
  const doneCount = todos.length - remaining;

  // 목록이 비었을 때 보여줄 문구
  let emptyMessage = "";
  if (todos.length === 0) {
    emptyMessage = "할 일을 추가해보세요.";
  } else if (visibleTodos.length === 0) {
    emptyMessage = keyword ? "검색 결과가 없어요." : "해당하는 할 일이 없어요.";
  }

  return (
    <main className="container">
      <header className="header">
        <h1>할 일 목록</h1>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </header>

      <TodoForm onAdd={addTodo} />

      {/* 할 일이 하나라도 있을 때만 검색창, 필터 보여줌 */}
      {todos.length > 0 && (
        <div className="toolbar">
          <SearchBar query={query} onChange={setQuery} />
          <FilterTabs filter={filter} onChange={setFilter} />
        </div>
      )}

      {/* 걸러낸 목록(visibleTodos)을 map으로 돌려서 TodoItem 목록 만듦. key로 항목 구분함 */}
      <ul className="todo-list">
        {visibleTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        ))}
      </ul>

      {emptyMessage && <p className="empty-message">{emptyMessage}</p>}

      {/* 하단: 완료 항목 삭제 버튼(완료한 게 있을 때만) + 남은 개수 */}
      {todos.length > 0 && (
        <div className="footer">
          {doneCount > 0 ? (
            <button className="small-button" onClick={clearDone}>
              완료 항목 삭제 ({doneCount})
            </button>
          ) : (
            <span />
          )}
          <p className="todo-count">남은 할 일 {remaining}개</p>
        </div>
      )}
    </main>
  );
}

export default App;
