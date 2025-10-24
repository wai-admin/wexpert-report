// 환자 요약 정보
interface PatientSummary {
  hospitalName: string;
  code: string;
  patientName: string;
  analysisDateTime: string; // ISO date string
}

// 분석 요약
export interface AnalysisSummary {
  implantPosition: string;
  ruptureStatus: string;
  surfaceType: string;
  invasionToCapsuleExist: boolean;
  invasionToLnExist: boolean;
}

// 라벨 정보
export interface AnalysisLabel {
  result_type: string;
  result_class: string;
  points: number[][][]; // [[[x, y], [x, y], ...]]
}

// 분석 정보
interface SonographyAnalysis {
  id: number;
  sonographyId: string;
  filename: string;
  width: number;
  height: number;
  status: "inProgress" | "success" | "failure";
  labels: AnalysisLabel[];
}

// 상담 요약
interface ConsultationSummary {
  questionCount: number;
  answerCount: number;
  hasNewAnswers: boolean;
}

// 초음파(sonography) 데이터
export interface Sonography {
  id: string;
  imageUrl: string;
  originalFileName: string;
  analysis: SonographyAnalysis;
  consultationSummary: ConsultationSummary;
  type: "LYMPH_NODE" | "BREAST_IMPLANT";
}

// 환자 상세 정보
interface PatientDetail {
  id: number;
  wexpertId: string;
  registeredAt: string; // ISO date string
  type: "aesthetic" | "reconstructive" | "both";
  name: string;
  comment: string;
  sonographyCount: number;
  sonographies: Sonography[];
  ruptureTriage: number;
  tcTriage: number;
  reportCount: number;
  analysisCompleted: boolean;
}

// 전체 응답 타입
export interface ReportDetail {
  patientSummary: PatientSummary;
  analysisSummary: AnalysisSummary;
  recommendedTreatment: string;
  patientDetail: PatientDetail;
}

export interface ReportResponse {
  data: ReportDetail;
}
