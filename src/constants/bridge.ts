const BRIDGE_TYPE = {
  INITIALIZED: "initialized",
  LOADING: "progress",
  CLOSE: "close",
  EXPIRED: "session_termination",
};

enum BRIDGE_MESSAGE_KEY {
  INITIALIZED = "accessToken",
}

export { BRIDGE_TYPE, BRIDGE_MESSAGE_KEY };
