/// <reference types="vite/client" />

declare global {
  interface Window {
    chrome?: {
      webview?: {
        postMessage: (message: string | object) => void;
        addEventListener: (
          event: "message",
          listener: (event: any) => void
        ) => void;
        removeEventListener: (
          event: "message",
          listener: (event: any) => void
        ) => void;
      };
    };

    // ✅ C#에서 호출하는 전역 함수 정의
    receiveBridgeMessage?: (param: any) => void;
  }
}

export {};
