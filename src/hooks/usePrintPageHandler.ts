import { useReport } from "@/services/useReport";
import { useMessageStore, useNewReportStore } from "@/store";
import { ImageExportOptionValues, UsePrintPageHandlerReturn } from "@/types";
import { ReportOptionType } from "@/lib/nativeMessageType";
import {
  checkTruthy,
  getPatientType,
  formatAnalysisDate,
  getImageCommentSummary,
  getRuptureImageCount,
  generateAnalysisItems,
  convertISOToLocal,
} from "@/utils";

const usePrintPageHandler = (): UsePrintPageHandlerReturn => {
  /**
   * @description: 훅 플로우
   * 1. Native Message Store에서 현재 타입 읽기
   * 2. 타입에 따라 적절한 데이터 훅 호출
   *    type === "new-report" → useNewReportDetail(...)
   *    type === "report-history" → useReportHistoryDetail(...)
   *    type === "all-report-history" → useAllReportHistoryDetail(...)
   *    각각은 내부에서 API(Call) + 가공까지 담당 (또는 최소한 원본 응답을 리턴)
   * 3. (필요하면) PrintPage용 zustand 스토어 값과 합쳐서 printPageData 생성
   * 4. { printPageData, isLoading, error } 형태로 반환
   */

  const { nativeMessage } = useMessageStore();
  const { imageExportOption, physicianAssessment } = useNewReportStore();
  const { data: newReport, isFetching: isNewReportFetching } = useReport({
    enabled: nativeMessage?.reportMode === ReportOptionType.NEW_REPORT,
  });

  console.log("usePrintPageHandler newReport: ", newReport);

  if (checkTruthy(newReport)) {
    return {
      printPageData: {
        cover: {
          hospitalName: newReport.data.patientSummary.hospitalName,
        },
        patientDetail: {
          chartNumber: newReport.data.patientDetail.chartNumber ?? "",
          patientName: newReport.data.patientSummary.patientName,
          birth: convertISOToLocal(
            newReport.data.patientDetail.birthDate ?? "",
            true
          ),
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
        reportMode: nativeMessage?.reportMode ?? ReportOptionType.NEW_REPORT,
      },
      isLoading: isNewReportFetching,
      error: null,
    };
  }

  return {
    printPageData: null,
    option: {
      imageExportOption: imageExportOption,
      sonographies: [],
      reportMode: nativeMessage?.reportMode ?? ReportOptionType.NEW_REPORT,
    },
    isLoading: false,
    error: null,
  };
};

export default usePrintPageHandler;
