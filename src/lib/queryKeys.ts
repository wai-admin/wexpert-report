/**
 * TanStack Query Key Constants
 * 쿼리 키를 중앙에서 관리하여 일관성을 유지하고 타입 안정성을 제공합니다.
 */
export const QUERY_KEYS = {
  // 리포트 정보 관련
  REPORT: {
    DETAIL: (patientId: string) => ["report", "detail", patientId] as const,
  },
} as const;

/**
 * Query Key 타입 정의
 */
export type QueryKeys = typeof QUERY_KEYS;
