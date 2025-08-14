const getApiBaseUrl = () => {
  const hostname = window.location.hostname;
  console.log("hostname", hostname);

  // 로컬 개발 환경
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "https://dev-wexpert-api.w-ai.ai";
  }

  // dev 서버 (URL에 dev 포함)
  if (hostname.includes("dev")) {
    return "https://dev-wexpert-api.w-ai.ai";
  }

  // stage 서버 (기본값)
  return "https://stage-wexpert-api.w-ai.ai";
};

// API 기본 설정
const API_BASE_URL = getApiBaseUrl();

const DEFAULT_OPTIONS = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
} as const;

export { API_BASE_URL, DEFAULT_OPTIONS };
