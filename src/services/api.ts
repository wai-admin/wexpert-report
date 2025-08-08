import { apiFetch } from "@/lib/api";
import { ReportResponse } from "@/lib/reportType";

// 리포트 관련 API
export const reportApi = {
  // 특정 환자 리포트 조회
  getReport: (patientId: string) =>
    apiFetch.get<ReportResponse>(`/v1/analysis/report/patient/${patientId}`),
};
