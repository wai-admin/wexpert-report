import { AxiosError } from "axios";

/**
 * AxiosError 타입 가드
 */
export const isAxiosError = (error: unknown): error is AxiosError => {
  return error !== null && typeof error === "object" && "response" in error;
};

/**
 * HTTP 상태 코드 추출
 */
export const getErrorStatusCode = (error: unknown): number | null => {
  if (isAxiosError(error)) {
    return error.response?.status ?? null;
  }
  return null;
};

/**
 * 특정 상태 코드 배열에 포함되는지 확인
 */
export const isErrorCodeIn = (
  error: unknown,
  codes: readonly number[]
): boolean => {
  const statusCode = getErrorStatusCode(error);
  console.log("isErrorCodeIn statusCode: ", statusCode);
  return statusCode !== null && codes.includes(statusCode);
};
