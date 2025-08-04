import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true, // 자동 브라우저 열기
  },
  build: {
    outDir: "dist", // 정적 빌드 결과 폴더
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          query: ["@tanstack/react-query"],
          state: ["zustand"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
});
