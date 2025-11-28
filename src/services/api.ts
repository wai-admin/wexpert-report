import { apiFetch } from "@/lib/api";
import {
  ReportResponse,
  ReportUploadRequest,
  ReportUploadResponse,
  PatientReportListResponse,
  AllPatientReportListResponse,
  PatientReportDetailResponse,
} from "@/lib";
import { ENDPOINTS } from "@/constants/endpoints";

// 리포트 관련 API
export const reportApi = {
  // 특정 환자 리포트 조회
  getReport: (patientId: string) => {
    return apiFetch.get<ReportResponse>(ENDPOINTS.REPORT.GET_REPORT(patientId));
  },
  // 특정 환자 리포트 리스트 조회
  getPatientReportList: (patientId: string) => {
    return apiFetch.get<PatientReportListResponse>(
      ENDPOINTS.REPORT.GET_PATIENT_REPORT_LIST(patientId)
    );
  },
  // 모든 환자 리포트 리스트 조회
  getAllPatientReportList: () => {
    return apiFetch.get<AllPatientReportListResponse>(
      ENDPOINTS.REPORT.GET_ALL_PATIENT_REPORT_LIST()
    );
  },
  // 특정 환자 리포트 상세 조회
  getPatientReportDetail: (patientId: string, reportId: string) => {
    return apiFetch.get<PatientReportDetailResponse>(
      ENDPOINTS.REPORT.GET_PATIENT_REPORT_DETAIL(patientId, reportId)
    );
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
