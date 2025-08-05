import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
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
});
