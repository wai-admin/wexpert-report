import { useEffect, ReactNode, useRef } from "react";
import {
  useBridgeStore,
  useAuthStore,
  useReportListStore,
  useErrorStore,
} from "@/store";
import { BridgeMessage } from "@/types/bridgeMessageType";
import { BRIDGE_MESSAGE_KEY, EXPIRED_ERROR_CODES } from "@/constants";
import {
  sendInitialized,
  sendCloseStatus,
  sendExpiredStatus,
  isErrorCodeIn,
  hasKey,
  checkTruthy,
} from "@/utils";

interface BridgeProviderProps {
  children: ReactNode;
}

/**
 * WebView2 Bridge 통신 관리 Provider
 * - C# 앱과의 메시지 송수신
 * - 초기화 및 인증 정보 처리
 * - 에러 상태 감지 및 세션 만료 처리
 * - 키보드 단축키 (ESC) 처리
 */
const BridgeProvider = ({ children }: BridgeProviderProps) => {
  const { setBridgeMessage } = useBridgeStore();
  const { setAccessToken } = useAuthStore();
  const { setSelectedPatientId } = useReportListStore();
  const { error, isError } = useErrorStore();
  const devCounterRef = useRef(0);

  /**
   * Bridge 초기화 및 메시지 수신 리스너 등록
   */
  useEffect(() => {
    /**
     * C# WebView2에서 전달받은 초기화 메시지 처리
     * - 액세스 토큰 저장
     * - 환자 ID 저장
     */
    const receiveBridgeMessage = (message: MessageEvent<BridgeMessage>) => {
      console.info("Bridge message received: ", message);
      if (message.origin !== window.origin) {
          console.warn(
            "Origin mismatch: ",
            message.origin,
            "!==",
            window.origin
          );
        return;
      }

      const { data: bridgeData } = message;
      if (bridgeData == null || bridgeData.accessToken == null) {
        console.warn("Invalid bridge data received");
        return;
      }

      console.log("receiveBridgeMessage from C#: ", message.data);
      if (hasKey(bridgeData, BRIDGE_MESSAGE_KEY.INITIALIZED)) {
        setBridgeMessage(bridgeData);
        setAccessToken(bridgeData.accessToken);
        setSelectedPatientId(bridgeData.id);
      }
    };

    // TODO: send message from console for testing
    window.chrome?.webview?.addEventListener("message", receiveBridgeMessage);
    if (import.meta.env.DEV) {
      window.addEventListener("message", receiveBridgeMessage);
      setTimeout(() => {
        devCounterRef.current += 1;
        if (devCounterRef.current > 1) return;
        console.log(
          `[DEV] Simulating bridge message #${devCounterRef.current}`
        );
        window.postMessage(
          {
            accessToken: import.meta.env.VITE_WEXPERT_USER_ACCESS_TOKEN || "test-access-token",
            nativeVersion: import.meta.env.VITE_WEXPERT_NATIVE_VERSION || "1.0.0-dev",
            id: Number.parseInt(import.meta.env.VITE_WEXPERT_PATIENT_ID) || 0,
            reportMode: import.meta.env.VITE_WEXPERT_REPORT_MODE || "all",
          } as BridgeMessage,
          window.origin
        );
      }, 1000);
    }
    sendInitialized();

    return () => {
      window.chrome?.webview?.removeEventListener(
        "message",
        receiveBridgeMessage
      );
      if (import.meta.env.DEV) {
        window.removeEventListener("message", receiveBridgeMessage);
      }
    };
  }, [setBridgeMessage, setAccessToken, setSelectedPatientId]);

  /**
   * ESC 키보드 이벤트 리스너 등록
   */
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        sendCloseStatus();
      }
    };

    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, []);

  /**
   * API 에러 감지 및 세션 만료 처리
   * - 401, 405, 406 에러 코드 발생 시 C#에 만료 메시지 전송
   */
  useEffect(() => {
    if (checkTruthy(error) && isError) {
      if (isErrorCodeIn(error, EXPIRED_ERROR_CODES)) {
        sendExpiredStatus();
      }
    }
  }, [error, isError]);

  return <>{children}</>;
};

export default BridgeProvider;
