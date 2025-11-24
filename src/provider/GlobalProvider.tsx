import { useEffect, ReactNode } from "react";
import { useMessageStore, useAuthStore, usePrintStore } from "@/store";
import {
  NativeDefaultMessage,
  NativeMessageData,
} from "@/lib/nativeMessageType";
import { hasKey } from "@/utils/common";
import { NATIVE_MESSAGE_KEY } from "@/constants/bridge";
import { sendInitialized } from "@/utils/bridge";

interface GlobalProviderProps {
  children: ReactNode;
}

/**
 * ✅ 1. C#의 WebView2에게 초기화 메시지 전송 및 access token 수신
 * ✅ 2. C#의 WebView2에서 사용자 입력 정보 수신
 * ✅ 3. C#의 WebView2에서 프린트 이벤트 처리
 */
const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const { setNativeMessage } = useMessageStore();
  const { setAccessToken } = useAuthStore();
  const { setPrintRequested } = usePrintStore();

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
      setNativeMessage(data as NativeDefaultMessage);

      setAccessToken((data as NativeDefaultMessage).accessToken);
    }

    // 프린트 이벤트 처리
    if (hasKey(data, NATIVE_MESSAGE_KEY.REQUEST_PRINT)) {
      setPrintRequested(true);
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

export default GlobalProvider;
