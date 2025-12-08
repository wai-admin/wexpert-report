import { useEffect, ReactNode } from "react";
import { useMessageStore, useAuthStore, useReportListStore } from "@/store";
import { NativeMessage, NativeMessageData } from "@/lib/nativeMessageType";
import { hasKey } from "@/utils/common";
import { NATIVE_MESSAGE_KEY } from "@/constants/bridge";
import { sendInitialized } from "@/utils/bridge";

interface BridgeProviderProps {
  children: ReactNode;
}

/**
 * ✅ 1. C#의 WebView2에게 초기화 메시지 전송 및 access token, patient id 획득
 */
const BridgeProvider = ({ children }: BridgeProviderProps) => {
  const { setNativeMessage } = useMessageStore();
  const { setAccessToken } = useAuthStore();
  const { setSelectedPatientId } = useReportListStore();

  // C#의 WebView2에게 초기화 메시지 전송
  const callNativeInitialized = () => {
    sendInitialized();
  };

  // C#의 WebView2에서 전달받은 메시지 처리
  const receiveNative = (message: NativeMessageData) => {
    console.log("receiveNative from C#: ", message.data);

    const { data } = message;

    // 토큰 및 사용자 입력 정보 처리
    if (hasKey(data, NATIVE_MESSAGE_KEY.INITIALIZED)) {
      setNativeMessage(data as NativeMessage);

      setAccessToken((data as NativeMessage).accessToken);
      setSelectedPatientId((data as NativeMessage).id);
    }
  };

  useEffect(() => {
    window.chrome?.webview?.addEventListener("message", receiveNative);
    callNativeInitialized();

    return () => {
      window.chrome?.webview?.removeEventListener("message", receiveNative);
    };
  }, []);

  return <>{children}</>;
};

export default BridgeProvider;
