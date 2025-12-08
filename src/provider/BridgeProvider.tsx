import { useEffect, ReactNode } from "react";
import { useBridgeStore, useAuthStore, useReportListStore } from "@/store";
import { BridgeMessage, BridgeMessageData } from "@/lib/bridgeMessageType";
import { hasKey } from "@/utils/common";
import { BRIDGE_MESSAGE_KEY } from "@/constants/bridge";
import { sendInitialized } from "@/utils/bridge";

interface BridgeProviderProps {
  children: ReactNode;
}

/**
 * ✅ 1. C#의 WebView2에게 초기화 메시지 전송 및 access token, patient id 획득
 */
const BridgeProvider = ({ children }: BridgeProviderProps) => {
  const { setBridgeMessage } = useBridgeStore();
  const { setAccessToken } = useAuthStore();
  const { setSelectedPatientId } = useReportListStore();

  // C#의 WebView2에게 초기화 메시지 전송
  const initializeBridge = () => {
    sendInitialized();
  };

  // C#의 WebView2에서 전달받은 메시지 처리
  const receiveBridgeMessage = (message: BridgeMessageData) => {
    console.log("receiveBridgeMessage from C#: ", message.data);

    const { data } = message;

    // 토큰 및 사용자 입력 정보 처리
    if (hasKey(data, BRIDGE_MESSAGE_KEY.INITIALIZED)) {
      setBridgeMessage(data as BridgeMessage);

      setAccessToken((data as BridgeMessage).accessToken);
      setSelectedPatientId((data as BridgeMessage).id);
    }
  };

  useEffect(() => {
    window.chrome?.webview?.addEventListener("message", receiveBridgeMessage);
    initializeBridge();

    return () => {
      window.chrome?.webview?.removeEventListener(
        "message",
        receiveBridgeMessage
      );
    };
  }, []);

  return <>{children}</>;
};

export default BridgeProvider;
