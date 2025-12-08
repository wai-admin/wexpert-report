import { useEffect } from "react";
import { useReport } from "@/services/useReport";
import {
  useNewReportStore,
  useReportListStore,
  useLoadingStore,
  useErrorStore,
  useCurrentReportModeStore,
} from "@/store";
import { ImageExportOptionValues, UsePrintHandlerReturn } from "@/types";
import {
  checkTruthy,
  getPatientType,
  formatAnalysisDate,
  getImageCommentSummary,
  getRuptureImageCount,
  generateAnalysisItems,
  convertISOToLocal,
} from "@/utils";
import { usePatientReportDetail } from "@/services/usePatientReportDetail";

const usePrintHandler = (): UsePrintHandlerReturn => {
  /**
   * @description: 훅 플로우
   * 1. Native Message Store에서 현재 타입 읽기
   * 2. 타입에 따라 적절한 데이터 훅 호출
   *    type === "new-report" → useNewReportDetail(...)
   *    type === "report-history" → useReportHistoryDetail(...)
   *    type === "all-report-history" → useAllReportHistoryDetail(...)
   *    각각은 내부에서 API(Call) + 가공까지 담당 (또는 최소한 원본 응답을 리턴)
   * 3. (필요하면) PrintPage용 zustand 스토어 값과 합쳐서 printData 생성
   * 4. { printData, isLoading, error } 형태로 반환
   */

  const { imageExportOption, physicianAssessment } = useNewReportStore();
  const { isNewReportMode, isPatientReportMode, isAllReportMode } =
    useCurrentReportModeStore();
  const { selectedReportId, selectedPatientId } = useReportListStore();
  const { setLoading } = useLoadingStore();
  const { setIsError } = useErrorStore();
  // New Report 모드
  const {
    data: newReport,
    isFetching: isNewReportFetching,
    isError: isNewReportError,
  } = useReport({
    enabled: isNewReportMode,
  });

  // Report History 모드 - 같은 쿼리 키로 캐시된 데이터 사용
  const {
    data: reportHistoryDetail,
    isFetching: isHistoryDetailFetching,
    isError: isHistoryDetailError,
  } = usePatientReportDetail({
    reportId: checkTruthy(selectedReportId) ? selectedReportId.toString() : "",
    patientId: checkTruthy(selectedPatientId)
      ? selectedPatientId.toString()
      : "",
    enabled: isPatientReportMode || isAllReportMode,
  });

  useEffect(() => {
    setLoading(isNewReportFetching || isHistoryDetailFetching);
  }, [isNewReportFetching, isHistoryDetailFetching]);

  useEffect(() => {
    setIsError(isNewReportError || isHistoryDetailError);
  }, [isNewReportError, isHistoryDetailError]);

  if (
    checkTruthy(reportHistoryDetail) &&
    (isPatientReportMode || isAllReportMode)
  ) {
    return {
      printData: {
        cover: {
          hospitalName:
            reportHistoryDetail.data.report.patientSummary.hospitalName,
        },
        patientDetail: {
          chartNumber: checkTruthy(
            reportHistoryDetail.data.report.patientSummary.chartNumber
          )
            ? reportHistoryDetail.data.report.patientSummary.chartNumber
            : "-",
          patientName: checkTruthy(
            reportHistoryDetail.data.report.patientSummary.patientName
          )
            ? reportHistoryDetail.data.report.patientSummary.patientName
            : "-",
          birth: checkTruthy(
            reportHistoryDetail.data.report.patientDetail.birthDate
          )
            ? convertISOToLocal(
                reportHistoryDetail.data.report.patientDetail.birthDate,
                true
              )
            : "-",
          patientType: getPatientType(
            reportHistoryDetail.data.report.patientDetail.type
          ),
          analysisDate: formatAnalysisDate(
            reportHistoryDetail.data.report.patientSummary.analysisDateTime
          ),
        },
        analysisSummary: {
          implantPosition:
            reportHistoryDetail.data.report.analysisSummary.implantPosition,
          surfaceType:
            reportHistoryDetail.data.report.analysisSummary.surfaceType,
          ruptureStatus:
            reportHistoryDetail.data.report.analysisSummary.ruptureStatus,
        },
        analysisResultByAI:
          reportHistoryDetail.data.report.recommendedTreatment,
        analysisImage: {
          commentSummary: getImageCommentSummary({
            totalAnalysisImageCount:
              reportHistoryDetail.data.report.patientDetail.sonographyCount,
            ruptureImageCount: getRuptureImageCount(
              reportHistoryDetail.data.report.patientDetail.sonographies
            ),
            invasionToCapsuleExist:
              reportHistoryDetail.data.report.analysisSummary
                .invasionToCapsuleExist,
            invasionToLymphNodeExist:
              reportHistoryDetail.data.report.analysisSummary
                .invasionToLymphNodeExist,
          }),
          analysisItems: generateAnalysisItems({
            onlyRuptureExist: !reportHistoryDetail.data.includeAllImages,
            sonographies:
              reportHistoryDetail.data.report.patientDetail.sonographies,
          }),
        },
        physicianAssessment: reportHistoryDetail.data.doctorOpinion,
      },
      option: {
        imageExportOption: reportHistoryDetail.data.includeAllImages
          ? ImageExportOptionValues.ALL_IMAGE
          : ImageExportOptionValues.RUPTURE_CASE,
        sonographies:
          reportHistoryDetail.data.report.patientDetail.sonographies,
      },
      // 개발 환경에서는 false, 프로덕션에서는 true
      isLoading: import.meta.env.PROD,
      error: null,
    };
  }

  if (checkTruthy(newReport) && isNewReportMode) {
    return {
      printData: {
        cover: {
          hospitalName: newReport.data.patientSummary.hospitalName,
        },
        patientDetail: {
          chartNumber: checkTruthy(newReport.data.patientDetail.chartNumber)
            ? newReport.data.patientDetail.chartNumber
            : "-",
          patientName: checkTruthy(newReport.data.patientSummary.patientName)
            ? newReport.data.patientSummary.patientName
            : "-",
          birth: checkTruthy(newReport.data.patientDetail.birthDate)
            ? convertISOToLocal(newReport.data.patientDetail.birthDate, true)
            : "-",
          patientType: getPatientType(newReport.data.patientDetail.type),
          analysisDate: formatAnalysisDate(
            newReport.data.patientSummary.analysisDateTime
          ),
        },
        analysisSummary: {
          implantPosition: newReport.data.analysisSummary.implantPosition,
          surfaceType: newReport.data.analysisSummary.surfaceType,
          ruptureStatus: newReport.data.analysisSummary.ruptureStatus,
        },
        analysisResultByAI: newReport.data.recommendedTreatment,
        analysisImage: {
          commentSummary: getImageCommentSummary({
            totalAnalysisImageCount:
              newReport.data.patientDetail.sonographyCount,
            ruptureImageCount: getRuptureImageCount(
              newReport.data.patientDetail.sonographies
            ),
            invasionToCapsuleExist:
              newReport.data.analysisSummary.invasionToCapsuleExist,
            invasionToLymphNodeExist:
              newReport.data.analysisSummary.invasionToLymphNodeExist,
          }),
          analysisItems: generateAnalysisItems({
            onlyRuptureExist:
              imageExportOption === ImageExportOptionValues.RUPTURE_CASE,
            sonographies: newReport.data.patientDetail.sonographies,
          }),
        },
        physicianAssessment: physicianAssessment,
      },
      option: {
        imageExportOption: imageExportOption,
        sonographies: newReport.data.patientDetail.sonographies,
      },
      isLoading: isNewReportFetching,
      error: null,
    };
  }

  return {
    printData: null,
    option: {
      imageExportOption: imageExportOption,
      sonographies: [],
    },
    // 개발 환경에서는 false, 프로덕션에서는 true
    isLoading: import.meta.env.PROD,
    error: null,
  };
};

export default usePrintHandler;
