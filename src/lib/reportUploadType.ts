// 리포트 정보 타입
// TODO: chartNumber, birthDate 타입 구체화
export interface ReportData {
  patientId: number | null;
  includeAllImages: boolean;
  chartNumber: number | null;
  birthDate: string | null;
  doctorOpinion: string | null;
}

// 리포트 업로드 요청 타입
export interface ReportUploadRequest {
  report: ReportData;
  file: File | null;
}

// 리포트 업로드 응답 타입
export interface ReportUploadResponse {
  success: boolean;
  reportId?: string;
  message?: string;
}
