import { useReport } from "@/services/useReport";
import {
  useMessageStore,
  useNewReportStore,
  useReportHistoryStore,
  usePatientControllerStore,
} from "@/store";
import {
  ImageExportOptionValues,
  ReportTabValues,
  UsePrintPageHandlerReturn,
} from "@/types";
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
import { usePatientReportDetail } from "@/services/usePatientReportDetail";

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
  const { selectedReportId } = useReportHistoryStore();
  const { selectedReportTab } = usePatientControllerStore();

  // New Report 모드
  const { data: newReport, isFetching: isNewReportFetching } = useReport({
    enabled: selectedReportTab === ReportTabValues.NEW_REPORT,
  });

  // Report History 모드 - 같은 쿼리 키로 캐시된 데이터 사용
  const { data: reportHistoryDetail, isFetching: isHistoryDetailFetching } =
    usePatientReportDetail({
      reportId: selectedReportId ?? "",
      enabled: selectedReportTab === ReportTabValues.REPORT_HISTORY,
    });

  console.log(
    "usePrintPageHandler: newReport/isLoading",
    newReport,
    isNewReportFetching
  );
  console.log(
    "usePrintPageHandler: reportHistoryDetail/isLoading",
    reportHistoryDetail,
    isHistoryDetailFetching
  );

  if (checkTruthy(reportHistoryDetail)) {
    return {
      printPageData: {
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
        reportMode: nativeMessage?.reportMode ?? ReportOptionType.NEW_REPORT,
      },
      isLoading: isHistoryDetailFetching,
      error: null,
    };
  }

  if (checkTruthy(newReport)) {
    return {
      printPageData: {
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
      // 개발 환경에서 테스트 시 해당 값 변경 필요
      reportMode: nativeMessage?.reportMode ?? ReportOptionType.NEW_REPORT,
    },
    // 개발 환경에서는 false, 프로덕션에서는 true
    isLoading: false,
    // isLoading: import.meta.env.PROD,
    error: null,
  };
};

export default usePrintPageHandler;
