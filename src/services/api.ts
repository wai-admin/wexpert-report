import { apiFetch } from "@/lib/api";
import {
  ReportResponse,
  ReportUploadRequest,
  ReportUploadResponse,
} from "@/lib";
import { ENDPOINTS } from "@/constants/endpoints";

// 리포트 관련 API
export const reportApi = {
  // 특정 환자 리포트 조회
  getReport: (patientId: string) => {
    console.log("getReport patientId", patientId);

    return apiFetch.get<ReportResponse>(ENDPOINTS.REPORT.GET_REPORT(patientId));
  },
  // 리포트 업로드
  uploadReport: async ({
    report,
    file,
  }: ReportUploadRequest): Promise<ReportUploadResponse> => {
    const formData = new FormData();

    const reportDataBlob = new Blob([JSON.stringify(report)], {
      type: "application/json",
    });
    formData.append("report", reportDataBlob);

    if (file) {
      formData.append("file", file, file.name);
    }

    return apiFetch.post<ReportUploadResponse>(
      ENDPOINTS.REPORT.UPLOAD_REPORT,
      formData
    );
  },
};
