// 환자 요약 정보
export interface PatientSummary {
  hospitalName: string;
  patientName: string;
  analysisDateTime: string; // ISO date string
  chartNumber: string;
  birthDate: string;
}

// 분석 요약
export interface AnalysisSummary {
  implantPosition: string;
  surfaceType: string;
  ruptureStatus: string;
  invasionToCapsuleExist: boolean;
  invasionToLymphNodeExist: boolean;
}

// 환자 상세 정보
export interface PatientDetail {
  id: number;
  wexpertId: string;
  registeredAt: string; // ISO date string
  type: "aesthetic" | "reconstructive" | "both";
  name: string;
  chartNumber: string | null;
  birthDate: string | null;
  sonographyCount: number;
  sonographies: Sonography[];
  ruptureTriage: number;
  tcTriage: number;
  reportCount: number;
  analysisCompleted: boolean;
  adminNote: NoteDetail;
}

// 관리자 노트 정보
interface NoteDetail {
  note: string;
  updatedAt: string; // ISO date string
}

// 초음파(sonography) 데이터
export interface Sonography {
  type: "LYMPH_NODE" | "BREAST_IMPLANT";
  id: string;
  imageUrl: string;
  originalFileName: string;
  analysis: SonographyAnalysis;
  consultationSummary: ConsultationSummary;
}

interface SonographyAnalysis {
  id: number;
  analyzedAt: string; // ISO date string
  sonographyId: string;
  filename: string;
  width: number;
  height: number;
  status: "inProgress" | "success" | "failure";
  labels: AnalysisLabel[];
}

// 라벨 정보
export interface AnalysisLabel {
  result_type: string;
  result_class: string;
  points: number[][][]; // [[[x, y], [x, y], ...]]
}

// 상담 요약
interface ConsultationSummary {
  questionCount: number;
  answerCount: number;
  hasNewAnswers: boolean;
}

export interface PatientReportDetailData {
  id: number;
  includeAllImages: boolean;
  doctorOpinion: string;
  report: {
    patientSummary: PatientSummary;
    analysisSummary: AnalysisSummary;
    recommendedTreatment: string;
    patientDetail: PatientDetail;
  };
}

export interface PatientReportDetailResponse {
  data: PatientReportDetailData;
}
