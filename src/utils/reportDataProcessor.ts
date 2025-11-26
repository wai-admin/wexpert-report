import {
  Sonography,
  ReportResponse,
  AnalysisSummary,
  ReportDetail,
} from "@/lib/reportType";
import { checkTruthy, formatAnalysisDate } from "@/utils";
import { ImageExportOptionValues } from "@/types";

const DEFAULT_REPORT_DATA: ReportDetail = {
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

/**
 * 리포트 데이터를 가공하여 컴포넌트에서 사용할 수 있는 형태로 변환
 * reportData가 없거나 유효하지 않으면 기본값 제공
 */
interface GenerateReportDataProps {
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
}

const generateReportData = (
  reportData: ReportResponse | undefined,
  imageExportOption: ImageExportOptionValues
): GenerateReportDataProps => {
  // reportData가 없거나 유효하지 않으면 기본값 사용
  const data = checkTruthy(reportData) ? reportData.data : DEFAULT_REPORT_DATA;

  const {
    patientSummary,
    analysisSummary,
    recommendedTreatment,
    patientDetail,
  } = data;
  const { hospitalName, analysisDateTime } = patientSummary;
  const { name, type, sonographies } = patientDetail;

  // 환자 정보 가공 (기본값 제공)
  const patientInformation = {
    chatNumber: "",
    patientName: name,
    type: type,
    birth: "",
    analysisDate: formatAnalysisDate(analysisDateTime),
  };

  // 분석 아이템 필터링 및 가공 (기본값: 빈 배열)
  const {
    analysisItems,
    totalAnalysisImageCount,
    lymphNodeImageCount,
    ruptureImageCount,
  } = getAnalysisInformation(sonographies, imageExportOption);

  return {
    hospitalName,
    patientInformation,
    analysisSummary,
    recommendedTreatment,
    analysisItems,
    totalAnalysisImageCount,
    lymphNodeImageCount,
    ruptureImageCount,
  };
};

/**
 * 분석 아이템들을 필터링하고 통계를 계산
 * sonographies가 없거나 유효하지 않으면 기본값 제공
 */
const getAnalysisInformation = (
  sonographies: Sonography[],
  imageExportOption: ImageExportOptionValues
) => {
  const { totalAnalysisImageCount, lymphNodeImageCount, ruptureImageCount } =
    getAnalysisItemCount(sonographies);

  const analysisItems = generateAnalysisItems({
    onlyRuptureExist:
      imageExportOption === ImageExportOptionValues.RUPTURE_CASE,
    sonographies: sonographies,
  });

  return {
    analysisItems,
    totalAnalysisImageCount,
    lymphNodeImageCount,
    ruptureImageCount,
  };
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

const generateAnalysisItems = ({
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

export { generateReportData, generateAnalysisItems };
