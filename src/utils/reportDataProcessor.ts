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
    type: string;
    analysisDate: string;
  };
  analysisSummary: AnalysisSummary;
  recommendedTreatment: string;
  analysisItems: Sonography[];
  totalAnalysisImageCount: number;
  lymphNodeImageCount: number;
  ruptureImageCount: number;
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
      invasionToLymphNodeExist: false,
    },
    recommendedTreatment: "",
    patientDetail: {
      id: 0,
      wexpertId: "",
      registeredAt: "",
      type: "aesthetic",
      name: "",
      adminNote: {
        note: "",
        updatedAt: "",
      },
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
    type: patientDetail?.type || "",
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
  const {
    analysisItems,
    totalAnalysisImageCount,
    lymphNodeImageCount,
    ruptureImageCount,
  } = processAnalysisItems(
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
    totalAnalysisImageCount,
    lymphNodeImageCount,
    ruptureImageCount,
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
  const { totalAnalysisImageCount, lymphNodeImageCount, ruptureImageCount } =
    getAnalysisItemCount(sonographies);

  const processedAnalysisItems = getAnalysisItems({
    onlyRuptureExist: exportOptionType === ExportOptionType.ONLY_POSITIVE_CASE,
    sonographies: sonographies,
  });

  return {
    analysisItems: processedAnalysisItems,
    totalAnalysisImageCount: totalAnalysisImageCount,
    lymphNodeImageCount: lymphNodeImageCount,
    ruptureImageCount: ruptureImageCount,
  };
};

export const getAnalysisItems = ({
  onlyRuptureExist,
  sonographies,
}: {
  onlyRuptureExist: boolean;
  sonographies: Sonography[];
}) => {
  let breastImplantLabels: Sonography[] = [];
  let lymphNodeLabels: Sonography[] = [];

  sonographies.forEach((item: Sonography) => {
    if (item.type === "BREAST_IMPLANT") {
      const breastImplantAnalysisLabels = item.analysis.labels.filter(
        (label) => label.result_type === "rupture"
      );

      if (breastImplantAnalysisLabels.length > 0) {
        breastImplantLabels.push(item);
      }
    }

    if (item.type === "LYMPH_NODE") {
      const lymphNodeAnalysisLabels = item.analysis.labels.filter(
        (label) => label.result_type === "silicone_invasion_to_ln"
      );

      if (lymphNodeAnalysisLabels.length > 0) {
        lymphNodeLabels.push(item);
      }
    }
  });

  if (onlyRuptureExist) {
    return [
      ...breastImplantLabels.filter((item: Sonography) =>
        item.analysis.labels.some(
          (label) =>
            label.result_type === "rupture" && label.result_class === "exist"
        )
      ),
      ...lymphNodeLabels,
    ];
  } else {
    return [...breastImplantLabels, ...lymphNodeLabels];
  }
};

const getAnalysisItemCount = (sonographies: Sonography[]) => {
  const breastImplantImages = sonographies.filter(
    (item: Sonography) => item.type === "BREAST_IMPLANT"
  );
  const lymphNodeImages = sonographies.filter(
    (item: Sonography) => item.type === "LYMPH_NODE"
  );
  const ruptureImages = breastImplantImages.filter((item: Sonography) => {
    return item.analysis.labels.some(
      (label) =>
        label.result_type === "rupture" && label.result_class === "exist"
    );
  });

  return {
    totalAnalysisImageCount: sonographies.length,
    breastImplantImageCount: breastImplantImages.length,
    lymphNodeImageCount: lymphNodeImages.length,
    ruptureImageCount: ruptureImages.length,
  };
};
