import { Sonography, ReportResponse, AnalysisSummary } from "@/lib/reportType";
import { ExportOptionType, NativeDefaultMessage } from "@/lib";
import { formatBirthDate } from "@/utils/common";
import { formatAnalysisDate } from "@/utils/date";

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
  assessment: string;
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
      invasionToCapsuleExist: false,
      invasionToLnExist: false,
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

  const assessment = nativeMessage?.assessment || "";

  return {
    hospitalName,
    patientInformation,
    analysisSummary,
    recommendedTreatment,
    analysisItems,
    analysisCount,
    ruptureCount,
    assessment,
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
  const { ruptureItemCount, ruptureExistItemCount } =
    getAnalysisItemCount(sonographies);

  const processedAnalysisItems = getAnalysisItems({
    onlyExist: exportOptionType === ExportOptionType.ONLY_POSITIVE_CASE,
    sonographies: sonographies,
  });

  return {
    analysisItems: processedAnalysisItems,
    analysisCount: ruptureItemCount,
    ruptureCount: ruptureExistItemCount,
  };
};

export const getAnalysisItems = ({
  onlyExist,
  sonographies,
}: {
  onlyExist: boolean;
  sonographies: Sonography[];
}) => {
  let analysisItems: Sonography[] = [];

  sonographies.forEach((item: Sonography) => {
    if (item.type === "LYMPH_NODE") {
      const lymphNodeAnalysisItems = item.analysis.labels.filter(
        (label) => label.result_type === "silicone_invasion_to_ln"
      );

      if (lymphNodeAnalysisItems.length > 0) {
        analysisItems.push(item);
      }
    }

    if (item.type === "BREAST_IMPLANT") {
      const breastImplantAnalysisItems = item.analysis.labels.filter(
        (label) => label.result_type === "rupture"
      );

      if (breastImplantAnalysisItems.length > 0) {
        analysisItems.push(item);
      }
    }
  });

  if (onlyExist) {
    return analysisItems.filter((item: Sonography) =>
      item.analysis.labels.some((label) => label.result_class === "exist")
    );
  } else {
    return analysisItems;
  }
};

const getAnalysisItemCount = (sonographies: Sonography[]) => {
  // 림프 노드 또는 파열 관련 아이템
  const allRuptureItems = sonographies.filter((item: Sonography) => {
    // WARNING: 림프 노드는 무조건 파열이 되어있음.
    if (item.type === "LYMPH_NODE") {
      return true;
    } else if (item.type === "BREAST_IMPLANT") {
      return item.analysis.labels.some(
        (label) => label.result_type === "rupture"
      );
    }
    return false;
  });

  // WARNING: 림프 노드는 무조건 파열이 되어있음.
  const existItems = allRuptureItems.filter(
    (item: Sonography) =>
      item.type === "LYMPH_NODE" ||
      (item.type === "BREAST_IMPLANT" &&
        item.analysis.labels.some((label) => label.result_class === "exist"))
  );

  return {
    ruptureItemCount: allRuptureItems.length || 0,
    ruptureExistItemCount: existItems.length || 0,
  };
};
