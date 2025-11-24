import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      // React 17+ JSX Transform 사용 (import React 불필요)
      jsxRuntime: "automatic",
    }),
  ],
  server: {
    port: 3000,
    open: true, // 자동 브라우저 열기
  },
  build: {
    outDir: "dist", // 정적 빌드 결과 폴더
    // 개발 모드에서는 소스맵 활성화, 프로덕션에서는 비활성화
    sourcemap: mode === "development" ? true : false,
    // 청크 크기 경고 임계값 설정
    chunkSizeWarningLimit: 1000, // 1000KB
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          // query: ["@tanstack/react-query"],
          // state: ["zustand"],
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
}));
