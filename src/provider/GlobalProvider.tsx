import { useEffect, ReactNode } from "react";
import { BRIDGE_TYPE } from "@/constants/bridge";
import { useMessageStore } from "@/store/messageStore";

interface GlobalProviderProps {
  children: ReactNode;
}

/**
 * ✅ 1. C#의 WebView2에게 초기화 메시지 전송 및 access token 수신
 */
const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const { setReceivedMessage } = useMessageStore();

  // C#의 WebView2에게 초기화 메시지 전송
  const callNative = () => {
    window.chrome?.webview?.postMessage({
      type: BRIDGE_TYPE.INITIALIZED,
    });
  };

  // C#의 WebView2에서 전달받은 메시지 처리 (초기에는 access token 수신)
  const receiveNative = (event: any) => {
    setReceivedMessage(event.data);
    console.log("receiveNative from C#: ", event.data);
  };

  useEffect(() => {
    window.chrome?.webview?.addEventListener("message", receiveNative);
    callNative();

    return () => {
      window.chrome?.webview?.removeEventListener("message", receiveNative);
    };
  }, []);

  return <>{children}</>;
};

export default GlobalProvider;
