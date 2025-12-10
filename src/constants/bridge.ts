const BRIDGE_TYPE = {
  INITIALIZED: "initialized",
  LOADING: "progress",
  CLOSE: "close",
};

enum BRIDGE_MESSAGE_KEY {
  INITIALIZED = "accessToken",
}

// TODO: 네이티브 버전 변경 시 반드시 NATIVE_VERSION enum 값 등록
enum NATIVE_VERSION {
  VERSION_0_10_3_25245 = "0.10.3.25245",
}

export { BRIDGE_TYPE, BRIDGE_MESSAGE_KEY, NATIVE_VERSION };
