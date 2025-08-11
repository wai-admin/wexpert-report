import { useEffect, ReactNode } from "react";
import { BRIDGE_TYPE } from "@/constants/bridge";
import { useMessageStore, useAuthStore } from "@/store";
import { NativeMessageData } from "@/lib/nativeMessageType";

interface GlobalProviderProps {
  children: ReactNode;
}

/**
 * ✅ 1. C#의 WebView2에게 초기화 메시지 전송 및 access token 수신
 */
const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const { setNativeMessage } = useMessageStore();
  const { setAccessToken } = useAuthStore();

  // C#의 WebView2에게 초기화 메시지 전송
  const callNativeInitialized = () => {
    window.chrome?.webview?.postMessage({
      type: BRIDGE_TYPE.INITIALIZED,
    });
  };

  // C#의 WebView2에서 전달받은 메시지 처리 (초기에는 access token 수신)
  const receiveNative = (message: NativeMessageData) => {
    const { data } = message;
    setNativeMessage(data);
    setAccessToken(data.accessToken);

    console.log("receiveNative from C#: ", message);
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

export default GlobalProvider;
