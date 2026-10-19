// 할 일 하나의 모양 정의함
// 여러 파일에서 같이 쓰려고 따로 분리함
export interface Todo {
  id: number; // 고유번호 (만든 시간)
  text: string; // 내용
  done: boolean; // 완료 여부
}

// 화면 테마. 이 두 문자열만 허용함 (오타 내면 TS가 에러로 알려줌)
export type Theme = "light" | "dark";
