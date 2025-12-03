import { useEffect, ReactNode } from "react";
import { useBridgeStore, useAuthStore, useReportStore } from "@/store";
import { BridgeMessage, BridgeMessageData } from "@/lib/bridgeMessageType";
import { hasKey } from "@/utils/common";
import { BRIDGE_MESSAGE_KEY } from "@/constants/bridge";
import { sendInitialized } from "@/utils/bridge";

interface BridgeProviderProps {
  children: ReactNode;
}

/**
 * WebView Bridge 초기화 및 메시지 수신 처리
 * - 초기화 메시지 전송
 * - access token, patient id 획득
 */
const BridgeProvider = ({ children }: BridgeProviderProps) => {
  const { setBridgeMessage } = useBridgeStore();
  const { setAccessToken } = useAuthStore();
  const { setSelectedPatientId } = useReportStore();

  // Bridge 초기화 메시지 전송
  const initializeBridge = () => {
    sendInitialized();
  };

  // Bridge에서 전달받은 메시지 처리
  const handleBridgeMessage = (message: BridgeMessageData) => {
    console.log("[Bridge] Received message:", message.data);

    const { data } = message;

    // 초기화 메시지 처리: 토큰 및 환자 정보 설정
    if (hasKey(data, BRIDGE_MESSAGE_KEY.INITIALIZED)) {
      setBridgeMessage(data as BridgeMessage);

      setAccessToken((data as BridgeMessage).accessToken);
      setSelectedPatientId((data as BridgeMessage).id);
    }
  };

  useEffect(() => {
    window.chrome?.webview?.addEventListener("message", handleBridgeMessage);
    initializeBridge();

    return () => {
      window.chrome?.webview?.removeEventListener(
        "message",
        handleBridgeMessage
      );
    };
  }, []);

  return <>{children}</>;
};

export default BridgeProvider;
