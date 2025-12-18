import { useEffect, ReactNode } from "react";
import {
  useBridgeStore,
  useAuthStore,
  useReportListStore,
  useErrorStore,
} from "@/store";
import { BridgeMessage, BridgeMessageData } from "@/types/bridgeMessageType";
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

  /**
   * Bridge 초기화 및 메시지 수신 리스너 등록
   */
  useEffect(() => {
    /**
     * C# WebView2에서 전달받은 초기화 메시지 처리
     * - 액세스 토큰 저장
     * - 환자 ID 저장
     */
    const receiveBridgeMessage = (message: BridgeMessageData) => {
      console.log("receiveBridgeMessage from C#: ", message.data);

      const { data } = message;

      if (hasKey(data, BRIDGE_MESSAGE_KEY.INITIALIZED)) {
        const bridgeData = data as BridgeMessage;

        setBridgeMessage(bridgeData);
        setAccessToken(bridgeData.accessToken);

        // setSelectedPatientId(bridgeData.id);
        /*
         * nativeMessage의 reportMode가
         * "all"인 경우 patient Id가 null로 전달
         * "patient", "create"인 경우 patient Id가 전달
         * W Expert 프로그램에서 F12를 클릭하여 개발자 도구 콘솔에 native message를 확인할 수 있습니다. 해당 부분에서 patient id를 복사하여 붙여넣으세요.
         */
        setSelectedPatientId(null);
      }
    };

    window.chrome?.webview?.addEventListener("message", receiveBridgeMessage);
    sendInitialized();

    return () => {
      window.chrome?.webview?.removeEventListener(
        "message",
        receiveBridgeMessage
      );
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
