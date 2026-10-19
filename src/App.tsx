import { useState, useEffect } from "react";
import type { Todo, Theme } from "./types";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import ThemeToggle from "./components/ThemeToggle";

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

// 저장된 목록 불러옴. 없거나 깨져 있으면 빈 배열
function loadTodos(): Todo[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return [];
  }
  try {
    return JSON.parse(saved) as Todo[];
  } catch {
    return [];
  }
}

// ===== 전체 앱 컴포넌트 =====
// 할 일 목록 데이터를 여기서 관리하고, 자식 컴포넌트에 props로 내려줌
function App() {
  // 할 일 목록. <Todo[]>로 "Todo 배열"이라고 타입 지정함
  const [todos, setTodos] = useState<Todo[]>(loadTodos);

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
  function addTodo(text: string) {
    const newTodo: Todo = { id: Date.now(), text, done: false };
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

  // 남은(완료 안 한) 할 일 개수. todos가 바뀌면 자동으로 다시 계산됨
  const remaining = todos.filter((todo) => !todo.done).length;

  return (
    <main className="container">
      <header className="header">
        <h1>할 일 목록</h1>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </header>

      <TodoForm onAdd={addTodo} />

      {/* 배열을 map으로 돌려서 TodoItem 목록 만듦. key로 항목 구분함 */}
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        ))}
      </ul>

      {/* 할 일이 없으면 안내 문구, 있으면 남은 개수 표시 */}
      {todos.length === 0 ? (
        <p className="empty-message">할 일을 추가해보세요.</p>
      ) : (
        <p className="todo-count">남은 할 일 {remaining}개</p>
      )}
    </main>
  );
}

export default App;
