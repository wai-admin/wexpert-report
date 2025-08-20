import {
  AnalysisResult,
  AnalysisSummary,
  AnalysisViewer,
  Assessment,
  PatientInformation,
  RecommendTreatment,
} from "@/components";
import { processReportData } from "@/utils/reportDataProcessor";
import { ELEMENT } from "@/constants/element";
import { ReportResponse } from "@/lib";
import { checkFalsy } from "@/utils";
import { useMessageStore } from "@/store";

interface ElementRendererProps {
  element: string;
  reportData: ReportResponse | undefined;
}

const ElementRenderer = ({ element, reportData }: ElementRendererProps) => {
  // 리포트 관련 커스텀 훅
  const { nativeMessage } = useMessageStore();

  const {
    patientInformation,
    analysisSummary,
    recommendedTreatment,
    analysisItems,
    analysisCount,
    ruptureCount,
  } = processReportData(reportData, nativeMessage);

  if (element === ELEMENT.PATIENT_INFORMATION) {
    return (
      <PatientInformation
        id={`${ELEMENT.A4_CONTAINER}-${element}`}
        key={element}
        patientInformation={patientInformation}
      />
    );
  }

  if (element === ELEMENT.ANALYSIS_SUMMARY) {
    return (
      <AnalysisSummary
        id={`${ELEMENT.A4_CONTAINER}-${element}`}
        key={element}
        analysisSummary={analysisSummary}
      />
    );
  }

  if (element === ELEMENT.RECOMMEND_TREATMENT) {
    return (
      <RecommendTreatment
        id={`${ELEMENT.A4_CONTAINER}-${element}`}
        key={element}
        recommendedTreatment={recommendedTreatment}
      />
    );
  }

  if (element === ELEMENT.ANALYSIS_VIEWER) {
    return (
      <AnalysisViewer
        id={`${ELEMENT.A4_CONTAINER}-${element}`}
        key={element}
        analysisCount={analysisCount}
        ruptureCount={ruptureCount}
      />
    );
  }

  if (element.includes(ELEMENT.ANALYSIS_RESULT_COMMON)) {
    // element 형식: analysis-result-{index}
    const analysisResultIndex = Number(element.split("-")[2]);
    const analysisItem = analysisItems[analysisResultIndex];

    // 예방 차원 (시나리오에 없음)
    if (checkFalsy(analysisItem)) {
      return <></>;
    }

    return (
      <AnalysisResult
        key={element}
        index={analysisResultIndex + 1}
        item={analysisItem}
      />
    );
  }

  if (element === ELEMENT.ASSESSMENT) {
    return (
      <Assessment id={`${ELEMENT.A4_CONTAINER}-${element}`} key={element} />
    );
  }

  return <></>;
};

export default ElementRenderer;
