import { useEffect } from "react";
import { sendLoadingStatus } from "@/utils/bridge";

/**
 * WebView에 로딩 상태를 전송하는 커스텀 훅
 * @param isFetching API 호출 상태
 */
export const useWebViewLoading = (isFetching: boolean) => {
  useEffect(() => {
    console.log("Loading Status: ", isFetching);
    sendLoadingStatus(isFetching);
  }, [isFetching]);
};
