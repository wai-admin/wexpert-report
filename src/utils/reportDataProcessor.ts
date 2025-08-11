import { Sonography, ReportResponse, AnalysisSummary } from "@/lib/reportType";
import {
  ExportOptionType,
  NativeDefaultMessage,
} from "@/lib/nativeMessageType";
import { formatBirthDate } from "@/utils/common";
import { formatAnalysisDate } from "@/utils/date";
import { PRINT_CONFIG } from "@/constants/print-config";

/**
 * 리포트 데이터를 가공하여 컴포넌트에서 사용할 수 있는 형태로 변환
 * reportData가 없거나 유효하지 않으면 기본값 제공
 */
interface ProcessedReportData {
  hospitalName: string;
  patientInformation: {
    chatNumber: string;
    patientName: string;
    birth: string;
    analysisDate: string;
  };
  analysisSummary: AnalysisSummary;
  recommendedTreatment: string;
  analysisItems: Sonography[];
  analysisCount: number;
  ruptureCount: number;
  firstPageItems: Sonography[];
  remainingItems: Sonography[];
}

export const processReportData = (
  reportData: ReportResponse | null | undefined,
  nativeMessage: NativeDefaultMessage | null | undefined
): ProcessedReportData => {
  // reportData가 없거나 유효하지 않으면 기본값 사용
  const data = reportData?.data || {
    patientSummary: {
      hospitalName: "",
      code: "",
      patientName: "",
      analysisDateTime: "",
    },
    analysisSummary: {
      implantPosition: "",
      ruptureStatus: "",
      surfaceType: "",
    },
    recommendedTreatment: "",
    patientDetail: {
      id: 0,
      wexpertId: "",
      registeredAt: "",
      type: "aesthetic",
      name: "",
      comment: "",
      sonographyCount: 0,
      sonographies: [],
      ruptureTriage: 0,
      tcTriage: 0,
      reportCount: 0,
      analysisCompleted: false,
    },
  };

  const {
    patientSummary,
    analysisSummary,
    recommendedTreatment,
    patientDetail,
  } = data;

  // 병원 이름 (기본값: 빈 문자열)
  const hospitalName = patientSummary?.hospitalName || "";

  // 환자 정보 가공 (기본값 제공)
  const patientInformation = {
    chatNumber: nativeMessage?.chartNo || "",
    patientName: patientDetail?.name || "",
    birth: formatBirthDate(
      nativeMessage?.birthYear,
      nativeMessage?.birthMonth,
      nativeMessage?.birthDay
    ),
    analysisDate: patientSummary?.analysisDateTime
      ? formatAnalysisDate(patientSummary.analysisDateTime)
      : "",
  };

  // 분석 아이템 필터링 및 가공 (기본값: 빈 배열)
  const { analysisItems, analysisCount, ruptureCount } = processAnalysisItems(
    patientDetail?.sonographies || [],
    nativeMessage?.exportOptionType
  );

  // 페이지별 아이템 분할
  const { firstPageItems, remainingItems } = splitItemsByPage(analysisItems);

  return {
    hospitalName,
    patientInformation,
    analysisSummary,
    recommendedTreatment,
    analysisItems,
    analysisCount,
    ruptureCount,
    firstPageItems,
    remainingItems,
  };
};

/**
 * 분석 아이템들을 필터링하고 통계를 계산
 * sonographies가 없거나 유효하지 않으면 기본값 제공
 */
const processAnalysisItems = (
  sonographies: Sonography[],
  exportOptionType?: ExportOptionType
) => {
  // sonographies가 없으면 빈 배열 사용
  const safeSonographies = sonographies || [];

  // 파열 관련 모든 아이템들 (안전한 필터링)
  const ruptureItems = safeSonographies.filter(
    (item: Sonography) =>
      item?.analysis?.labels?.some(
        (label) => label?.result_type === "rupture"
      ) || false
  );

  // exportOptionType에 따른 필터링
  const analysisItems =
    exportOptionType === ExportOptionType.ONLY_POSITIVE_CASE
      ? ruptureItems.filter(
          (item: Sonography) =>
            item?.analysis?.labels?.some(
              (label) =>
                label?.result_type === "rupture" &&
                label?.result_class !== "exist"
            ) || false
        )
      : ruptureItems;

  // 통계 계산 (기본값: 0)
  const analysisCount = analysisItems?.length || 0;
  const ruptureCount =
    analysisItems?.filter(
      (item: Sonography) =>
        item?.analysis?.labels?.some(
          (label) =>
            label?.result_type === "rupture" && label?.result_class === "exist"
        ) || false
    )?.length || 0;

  return { analysisItems: analysisItems || [], analysisCount, ruptureCount };
};

/**
 * 분석 아이템들을 페이지별로 분할
 * analysisItems가 없거나 유효하지 않으면 빈 배열 제공
 */
const splitItemsByPage = (analysisItems: Sonography[]) => {
  // analysisItems가 없으면 빈 배열 사용
  const safeAnalysisItems = analysisItems || [];

  const firstPageItems = safeAnalysisItems.slice(
    0,
    PRINT_CONFIG.FIRST_PAGE_ITEMS
  );
  const remainingItems = safeAnalysisItems.slice(PRINT_CONFIG.FIRST_PAGE_ITEMS);

  return { firstPageItems, remainingItems };
};
