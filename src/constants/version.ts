/**
 * 버전별 기능 플래그 및 상수
 */

export const VERSION_FEATURES = {
  /** 새로운 리포트 UI (2.0.0부터 지원) */
  NEW_REPORT_UI: "2.0.0",
  
  /** 향상된 분석 뷰어 (2.1.0부터 지원) */
  ENHANCED_ANALYSIS_VIEWER: "2.1.0",
  
  /** 다중 언어 지원 (1.5.0부터 지원) */
  MULTI_LANGUAGE: "1.5.0",
  
  /** PDF 내보내기 개선 (2.2.0부터 지원) */
  IMPROVED_PDF_EXPORT: "2.2.0",
} as const;

/**
 * 레거시 버전 지원 범위
 */
export const LEGACY_VERSION_SUPPORT = {
  /** 레거시 리포트 UI 지원 최대 버전 (2.0.0 미만) */
  LEGACY_REPORT_UI_MAX: "2.0.0",
  
  /** 최소 지원 버전 */
  MIN_SUPPORTED_VERSION: "1.0.0",
} as const;

