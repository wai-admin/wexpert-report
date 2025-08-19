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
import { ReportResponse, NativeDefaultMessage } from "@/lib";

interface ElementRendererProps {
  element: string;
  reportData: ReportResponse | undefined;
  nativeMessage: NativeDefaultMessage | null;
}

const ElementRenderer = ({
  element,
  reportData,
  nativeMessage,
}: ElementRendererProps) => {
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
        key={element}
        patientInformation={patientInformation}
      />
    );
  }

  if (element === ELEMENT.ANALYSIS_SUMMARY) {
    return <AnalysisSummary key={element} analysisSummary={analysisSummary} />;
  }

  if (element === ELEMENT.RECOMMEND_TREATMENT) {
    return (
      <RecommendTreatment
        key={element}
        recommendedTreatment={recommendedTreatment}
      />
    );
  }

  if (element === ELEMENT.ANALYSIS_VIEWER) {
    return (
      <AnalysisViewer
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

    return (
      <AnalysisResult
        key={element}
        index={analysisResultIndex + 1}
        item={analysisItem}
      />
    );
  }

  if (element === ELEMENT.ASSESSMENT) {
    return <Assessment key={element} />;
  }

  return <></>;
};

export default ElementRenderer;
