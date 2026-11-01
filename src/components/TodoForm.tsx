import { useState } from "react";
import type { FormEvent } from "react";
import { PRIORITY_LABELS } from "../types";
import type { Priority } from "../types";

// 이 컴포넌트가 받는 props의 타입 정의함
interface TodoFormProps {
  onAdd: (text: string, priority: Priority) => void; // 내용과 우선순위 받는 함수
}

// ===== 입력창 컴포넌트 =====
// 할 일과 우선순위 입력받아서 부모(App)가 넘겨준 onAdd 함수로 전달함
function TodoForm({ onAdd }: TodoFormProps) {
  // 입력창에 쓰고 있는 글자 기억함. 초기값이 ""라서 string으로 자동 추론됨
  const [text, setText] = useState("");
  // 고른 우선순위. 기본값 "보통"
  const [priority, setPriority] = useState<Priority>("medium");

  // event 타입: <form>에서 발생한 제출 이벤트
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // 폼 제출 시 페이지 새로고침 막음

    const trimmed = text.trim(); // 앞뒤 공백 제거
    if (trimmed === "") {
      return; // 빈 칸이면 추가 안 함
    }

    onAdd(trimmed, priority);
    setText(""); // 입력창 비움
    setPriority("medium"); // 우선순위도 기본값으로 되돌림
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="할 일을 입력하세요"
        autoComplete="off"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      {/* select의 값은 항상 문자열이라 Priority로 알려줌 (option 값이 셋 중 하나뿐이라 안전함) */}
      <select
        className="priority-select"
        value={priority}
        onChange={(event) => setPriority(event.target.value as Priority)}
      >
        <option value="high">{PRIORITY_LABELS.high}</option>
        <option value="medium">{PRIORITY_LABELS.medium}</option>
        <option value="low">{PRIORITY_LABELS.low}</option>
      </select>
      <button type="submit">추가</button>
    </form>
  );
}

export default TodoForm;
