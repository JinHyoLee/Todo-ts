// 우선순위. 이 세 문자열만 허용함
export type Priority = "high" | "medium" | "low";

// 우선순위를 화면에 보여줄 글자
// Record<Priority, string>: Priority의 세 값을 키로 전부 가져야 함 (하나 빠뜨리면 TS가 에러로 알려줌)
export const PRIORITY_LABELS: Record<Priority, string> = {
  high: "높음",
  medium: "보통",
  low: "낮음",
};

// 할 일 하나의 모양 정의함
// 여러 파일에서 같이 쓰려고 따로 분리함
export interface Todo {
  id: number; // 고유번호 (만든 시간)
  text: string; // 내용
  done: boolean; // 완료 여부
  priority: Priority; // 우선순위
}

// 목록 필터. 전체 / 진행 중 / 완료
export type Filter = "all" | "active" | "done";

// 화면 테마. 이 두 문자열만 허용함 (오타 내면 TS가 에러로 알려줌)
export type Theme = "light" | "dark";
