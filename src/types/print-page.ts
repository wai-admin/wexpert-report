import { ImageExportOptionValues } from "./new-report";
import { ReportSonography } from "@/lib/reportType";
import { Sonography as DetailSonography } from "@/lib/patientReportDetailType";

/**
 * PrintPage에서 사용하는 환자 상세 정보
 */
export interface PrintPagePatientDetail {
  chartNumber: string;
  patientName: string;
  birth: string;
  patientType: string;
  analysisDate: string;
}

/**
 * PrintPage에서 사용하는 분석 요약 정보
 */
export interface PrintPageAnalysisSummary {
  implantPosition: string | null;
  surfaceType: string | null;
  ruptureStatus: string | null;
}

/**
 * PrintPage에서 사용하는 분석 이미지 정보
 */
export interface PrintPageAnalysisImage {
  commentSummary: string;
  analysisItems: ReportSonography[] | DetailSonography[];
  itemOption: AnalysisItemOption;
}

/**
 * PrintPage에서 사용하는 분석 이미지 옵션
 */
export interface AnalysisItemOption {
  imageExportOption: ImageExportOptionValues;
  sonographies: ReportSonography[] | DetailSonography[];
}

/**
 * PrintPage 렌더링을 위한 전체 데이터 구조
 */
export interface PrintData {
  cover: PrintPageCover;
  patientDetail: PrintPagePatientDetail;
  analysisSummary: PrintPageAnalysisSummary;
  analysisResultByAI: string;
  analysisImage: PrintPageAnalysisImage;
  physicianAssessment: string;
}

/**
 * PrintPage에서 사용하는 커버 정보
 */
export interface PrintPageCover {
  hospitalName: string;
}

/**
 * usePrintHandler의 반환 타입
 */
export interface UsePrintHandlerReturn {
  printData: PrintData | null;
}
