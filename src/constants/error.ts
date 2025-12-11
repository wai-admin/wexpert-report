/**
 * HTTP 에러 코드 관련 상수
 */

/**
 * 세션 만료로 간주되는 HTTP 에러 코드
 * - 401: 유효하지 않은 토큰
 * - 405: 중복 로그인
 * - 406: 라이선스 정보 업데이트
 */
export const EXPIRED_ERROR_CODES = [401, 405, 406] as const;

/**
 * 세션 만료 에러 코드 타입
 */
export type ExpiredErrorCode = (typeof EXPIRED_ERROR_CODES)[number];
