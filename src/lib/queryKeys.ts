/**
 * TanStack Query Key Constants
 * 쿼리 키를 중앙에서 관리하여 일관성을 유지하고 타입 안정성을 제공합니다.
 */
export const QUERY_KEYS = {
  // 리포트 정보 관련
  REPORT: {
    DETAIL: (patientId: string) => ["report", "detail", patientId] as const,
    PATIENT_LIST: (patientId: string) =>
      ["report", "patient", "list", patientId] as const,
    ALL_PATIENT_LIST: (params: AllPatientReportListParams) =>
      ["report", "all", "list", params] as const,
    PATIENT_DETAIL: (patientId: string, reportId: string) =>
      ["report", "patient", "detail", patientId, reportId] as const,
    UPLOAD: () => ["report", "upload"] as const,
  },
} as const;

// Query Key 타입 정의
export type QueryKeys = typeof QUERY_KEYS;

export interface AllPatientReportListParams {
  query: string;
  page: number;
  limit: number;
  sortBy: "REPORT_CREATED_AT" | "PATIENT_NAME";
  sortOrder: "ASC" | "DESC";
}
