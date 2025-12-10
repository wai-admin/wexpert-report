import { useEffect, ReactNode } from "react";
import { useBridgeStore, useAuthStore, useReportListStore } from "@/store";
import { BridgeMessage, BridgeMessageData } from "@/lib/bridgeMessageType";
import { hasKey } from "@/utils/common";
import { BRIDGE_MESSAGE_KEY } from "@/constants/bridge";
import { sendInitialized, sendCloseStatus } from "@/utils/bridge";

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

  // C#의 WebView2에게 초기화 메시지 전송 및 메시지 수신 리스너 등록
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

  // ESC 키 감지 → C#에 close 메시지 전송
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log("handleKeyDown: ", event.key);
      if (event.key === "Escape") {
        sendCloseStatus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <>{children}</>;
};

export default BridgeProvider;
