import { BRIDGE_TYPE } from "@/constants/bridge";

const sendInitialized = () => {
  window.chrome?.webview?.postMessage({
    type: BRIDGE_TYPE.INITIALIZED,
  });
};

const sendLoadingStatus = (isLoading: boolean) => {
  window.chrome?.webview?.postMessage({
    type: BRIDGE_TYPE.LOADING,
    payload: isLoading,
  });
};

const sendPrintStatus = (isOpen: boolean) => {
  window.chrome?.webview?.postMessage({
    type: BRIDGE_TYPE.PRINT_STATUS,
    payload: isOpen,
  });
};

export { sendInitialized, sendLoadingStatus, sendPrintStatus };
