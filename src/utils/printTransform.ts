import {
  checkTruthy,
  getPatientType,
  formatAnalysisDate,
  getImageCommentSummary,
  getRuptureImageCount,
  generateAnalysisItems,
  convertISOToLocal,
} from "@/utils";
import {
  ReportPatientSummary,
  ReportAnalysisSummary,
  ReportPatientDetail,
  ReportDetail,
  ReportSonography,
} from "@/lib/reportType";
import {
  PatientSummary as DetailPatientSummary,
  PatientDetail as DetailPatientDetail,
  AnalysisSummary as DetailAnalysisSummary,
  PatientReportDetailData,
  Sonography as DetailSonography,
} from "@/lib/patientReportDetailType";
import { ImageExportOptionValues, UsePrintHandlerReturn } from "@/types";

// 공통 Sonography 타입 (두 API 모두 지원)
type CommonSonography = DetailSonography | ReportSonography;

// 값이 비어있는 경우 표시되는 문자
const EMPTY_VALUE = "-";

/**
 * 환자 상세 정보 변환
 */
export const transformPatientDetail = (
  patientDetail: DetailPatientDetail | ReportPatientDetail,
  patientSummary: DetailPatientSummary | ReportPatientSummary
) => ({
  chartNumber: checkTruthy(patientDetail.chartNumber)
    ? patientDetail.chartNumber
    : EMPTY_VALUE,
  patientName: checkTruthy(patientSummary.patientName)
    ? patientSummary.patientName
    : EMPTY_VALUE,
  birth: checkTruthy(patientDetail.birthDate)
    ? convertISOToLocal(patientDetail.birthDate, true)
    : EMPTY_VALUE,
  patientType: getPatientType(patientDetail.type),
  analysisDate: formatAnalysisDate(patientSummary.analysisDateTime),
});

/**
 * 분석 이미지 정보 변환
 */
export const transformAnalysisImage = (
  patientDetail: DetailPatientDetail | ReportPatientDetail,
  analysisSummary: DetailAnalysisSummary | ReportAnalysisSummary,
  onlyRuptureExist: boolean
) => ({
  commentSummary: getImageCommentSummary({
    totalAnalysisImageCount: patientDetail.sonographyCount,
    ruptureImageCount: getRuptureImageCount(
      patientDetail.sonographies as CommonSonography[]
    ),
    invasionToCapsuleExist: analysisSummary.invasionToCapsuleExist,
    invasionToLymphNodeExist: analysisSummary.invasionToLymphNodeExist,
  }),
  analysisItems: generateAnalysisItems({
    onlyRuptureExist,
    sonographies: patientDetail.sonographies as CommonSonography[],
  }),
  itemOption: {
    imageExportOption: onlyRuptureExist
      ? ImageExportOptionValues.RUPTURE_CASE
      : ImageExportOptionValues.ALL_IMAGE,
    sonographies: patientDetail.sonographies as CommonSonography[],
  },
});

/**
 * Report History 모드 결과 생성
 */
export const buildHistoryPrintResult = (
  payload: PatientReportDetailData
): UsePrintHandlerReturn => {
  const { report, includeAllImages, doctorOpinion } = payload;

  return {
    printData: {
      cover: {
        hospitalName: report.patientSummary.hospitalName,
      },
      patientDetail: transformPatientDetail(
        report.patientDetail,
        report.patientSummary
      ),
      analysisSummary: {
        implantPosition: report.analysisSummary.implantPosition,
        surfaceType: report.analysisSummary.surfaceType,
        ruptureStatus: report.analysisSummary.ruptureStatus,
      },
      analysisResultByAI: report.recommendedTreatment,
      analysisImage: transformAnalysisImage(
        report.patientDetail,
        report.analysisSummary,
        !includeAllImages
      ),
      physicianAssessment: doctorOpinion,
    },
  };
};

/**
 * New Report 모드 결과 생성
 */
export const buildNewReportPrintResult = (
  payload: ReportDetail,
  imageExportOption: ImageExportOptionValues,
  physicianAssessment: string
): UsePrintHandlerReturn => {
  const {
    analysisSummary,
    patientSummary,
    patientDetail,
    recommendedTreatment,
  } = payload;

  return {
    printData: {
      cover: {
        hospitalName: patientSummary.hospitalName,
      },
      patientDetail: transformPatientDetail(patientDetail, patientSummary),
      analysisSummary: {
        implantPosition: analysisSummary.implantPosition,
        surfaceType: analysisSummary.surfaceType,
        ruptureStatus: analysisSummary.ruptureStatus,
      },
      analysisResultByAI: recommendedTreatment,
      analysisImage: transformAnalysisImage(
        patientDetail,
        analysisSummary,
        imageExportOption === ImageExportOptionValues.RUPTURE_CASE
      ),
      physicianAssessment,
    },
  };
};
