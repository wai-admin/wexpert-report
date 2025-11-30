import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./i18n";
import "./style/globals.css";
import "./global.d.ts";
import { registerServiceWorker } from "./utils/serviceWorker";

// Service Worker 등록 (폰트 및 정적 자산 캐싱)
if (import.meta.env.PROD) {
  // 프로덕션 환경에서만 Service Worker 활성화
  registerServiceWorker();
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
