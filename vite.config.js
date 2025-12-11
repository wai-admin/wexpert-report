import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig((mode) => ({
  /*
   * versions/v1.8.1/index.html 내부 리소스 경로가 아래와 같을 확률이 높다.
   * <script src="/assets/index-xxx.js"></script>
   * 이러면 URL이 /assests/xxx.js로 내려가서 실제로는 404 또는 403이 발생할 수 있다.
   * 이러한 이유로 base 경로를 ./로 설정하여 실제 파일 경로를 참조하도록 한다.
   */
  base: "./",
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
    //모든 환경에서 소스맵 활성화
    sourcemap: mode === "development" ? true : false,
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
      // Service Worker를 빌드에서 제외하지 않도록 설정
      external: [],
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  // Service Worker 파일이 public 폴더에 있으므로 자동으로 dist로 복사됨
  publicDir: "public",
}));
