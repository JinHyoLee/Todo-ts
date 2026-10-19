import { useState } from "react";
import type { KeyboardEvent } from "react";
import type { Todo } from "../types";

// 이 컴포넌트가 받는 props의 타입 정의함
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

// ===== 할 일 한 줄 컴포넌트 =====
// 보기 모드와 수정 모드 두 가지 화면을 가짐
function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false); // 수정 중인지 여부 (boolean)
  const [editText, setEditText] = useState(todo.text); // 수정 입력창 글자 (string)

  // 수정 모드 시작. 입력창에 현재 내용 채워둠
  function startEdit() {
    setEditText(todo.text);
    setIsEditing(true);
  }

  // 수정 내용 저장. 빈 칸이면 원래 내용 유지함
  function saveEdit() {
    const trimmed = editText.trim();
    if (trimmed !== "") {
      onEdit(todo.id, trimmed);
    }
    setIsEditing(false);
  }

  // 수정 취소. 바뀐 내용 버림
  function cancelEdit() {
    setIsEditing(false);
  }

  // Enter는 저장, Esc는 취소
  // event 타입: <input>에서 발생한 키보드 이벤트
  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      saveEdit();
    } else if (event.key === "Escape") {
      cancelEdit();
    }
  }

  return (
    <li className={todo.done ? "todo-item done" : "todo-item"}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />

      {isEditing ? (
        // 수정 모드: 입력창 + 저장/취소 버튼
        <>
          <input
            className="edit-input"
            type="text"
            value={editText}
            onChange={(event) => setEditText(event.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button className="small-button" onClick={saveEdit}>저장</button>
          <button className="small-button" onClick={cancelEdit}>취소</button>
        </>
      ) : (
        // 보기 모드: 내용 + 수정/삭제 버튼. 내용을 더블클릭해도 수정 모드로 바뀜
        <>
          <span className="todo-text" onDoubleClick={startEdit}>
            {todo.text}
          </span>
          <button className="small-button" onClick={startEdit}>수정</button>
          <button className="small-button delete-button" onClick={() => onDelete(todo.id)}>
            삭제
          </button>
        </>
      )}
    </li>
  );
}

export default TodoItem;
