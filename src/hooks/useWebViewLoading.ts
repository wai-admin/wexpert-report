import { useEffect } from "react";
import { BRIDGE_TYPE } from "@/constants/bridge";

/**
 * WebView에 로딩 상태를 전송하는 커스텀 훅
 * @param isFetching API 호출 상태
 */
export const useWebViewLoading = (isFetching: boolean) => {
  useEffect(() => {
    console.log("WebView loading state: ", isFetching);

    window.chrome?.webview?.postMessage({
      type: BRIDGE_TYPE.LOADING,
      payload: isFetching,
    });
  }, [isFetching]);
};
