/**
 * API 엔드포인트 상수 관리
 * 모든 API 엔드포인트를 중앙에서 관리하여 일관성과 유지보수성을 높입니다.
 */

// 리포트 관련 엔드포인트
const REPORT_ENDPOINTS = {
  // 특정 환자 리포트 조회
  GET_REPORT: (patientId: string) => `/v1/analysis/report/patient/${patientId}`,
  // 리포트 수정
  UPLOAD_REPORT: "/v1/analysis/report",
} as const;

// 모든 엔드포인트를 하나의 객체로 export
export const ENDPOINTS = {
  REPORT: REPORT_ENDPOINTS,
} as const;
