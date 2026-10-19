import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite 설정. React(JSX, 저장 시 즉시 반영) 플러그인 사용함
export default defineConfig({
  plugins: [react()],
});
