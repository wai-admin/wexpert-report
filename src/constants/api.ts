import { checkDev } from "@/utils/common";

// API 기본 설정
// TODO: stg 서버 base url 설정
const API_BASE_URL = checkDev()
  ? "https://dev-wexpert-api.w-ai.ai"
  : "https://stage-wexpert-api.w-ai.ai";

const DEFAULT_OPTIONS = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
} as const;

export { API_BASE_URL, DEFAULT_OPTIONS };
