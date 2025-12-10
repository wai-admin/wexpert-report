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

const sendCloseStatus = () => {
  window.chrome?.webview?.postMessage({
    type: BRIDGE_TYPE.CLOSE,
    payload: false,
  });
};

const sendExpiredStatus = () => {
  window.chrome?.webview?.postMessage({
    type: BRIDGE_TYPE.EXPIRED,
    payload: true,
  });
};

export {
  sendInitialized,
  sendLoadingStatus,
  sendCloseStatus,
  sendExpiredStatus,
};
