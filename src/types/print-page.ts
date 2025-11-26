import { ImageExportOptionValues } from "./new-report";
import { Sonography } from "@/lib/reportType";

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
  analysisItems: Sonography[];
}

/**
 * PrintPage 렌더링을 위한 전체 데이터 구조
 */
export interface PrintPageData {
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
 * usePrintPageHandler의 반환 타입
 */
export interface PrintPageOption {
  imageExportOption: ImageExportOptionValues;
  sonographies: Sonography[];
}

/**
 * usePrintPageHandler의 반환 타입
 */
export interface UsePrintPageHandlerReturn {
  printPageData: PrintPageData | null;
  option: PrintPageOption;
  isLoading: boolean;
  error: Error | null;
}
