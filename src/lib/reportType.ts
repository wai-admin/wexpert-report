// 환자 요약 정보 (New Report 전용)
export interface ReportPatientSummary {
  hospitalName: string;
  code: string;
  patientName: string;
  analysisDateTime: string; // ISO date string
}

// 분석 요약 (New Report 전용)
export interface ReportAnalysisSummary {
  implantPosition: string | null;
  ruptureStatus: string | null;
  surfaceType: string | null;
  invasionToCapsuleExist: boolean;
  invasionToLymphNodeExist: boolean;
}

// 라벨 정보
export interface ReportAnalysisLabel {
  result_type: string;
  result_class: string;
  points: number[][][]; // [[[x, y], [x, y], ...]]
}

// 분석 정보
interface ReportSonographyAnalysis {
  id: number;
  sonographyId: string;
  filename: string;
  width: number;
  height: number;
  status: "inProgress" | "success" | "failure";
  labels: ReportAnalysisLabel[];
}

// 상담 요약
interface ReportConsultationSummary {
  questionCount: number;
  answerCount: number;
  hasNewAnswers: boolean;
}

// 초음파(sonography) 데이터 (New Report 전용)
export interface ReportSonography {
  id: string;
  imageUrl: string;
  originalFileName: string;
  analysis: ReportSonographyAnalysis;
  consultationSummary: ReportConsultationSummary;
  type: "LYMPH_NODE" | "BREAST_IMPLANT";
}

interface ReportNoteDetail {
  note: string;
  updatedAt: string; // ISO date string
}

// 환자 상세 정보 (New Report 전용)
export interface ReportPatientDetail {
  id: number;
  wexpertId: string;
  registeredAt: string; // ISO date string
  type: "aesthetic" | "reconstructive" | "both";
  name: string;
  adminNote: ReportNoteDetail;
  sonographyCount: number;
  sonographies: ReportSonography[];
  ruptureTriage: number;
  tcTriage: number;
  reportCount: number;
  analysisCompleted: boolean;
  birthDate: string | null;
  chartNumber: string | null;
}

// 전체 응답 타입
export interface ReportDetail {
  patientSummary: ReportPatientSummary;
  analysisSummary: ReportAnalysisSummary;
  recommendedTreatment: string;
  patientDetail: ReportPatientDetail;
}

export interface ReportResponse {
  data: ReportDetail;
}
