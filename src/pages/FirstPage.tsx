import {
  PatientInformation,
  AnalysisSummary,
  RecommendTreatment,
  AnalysisViewer,
  A4Template,
  Assessment,
} from "@/components";
import { PRINT_CONFIG } from "@/constants/print-config";
import { AnalysisSummary as AnalysisSummaryType, Sonography } from "@/lib";

interface FirstPageProps {
  patientInformation: {
    chatNumber: string;
    patientName: string;
    birth: string;
    analysisDate: string;
  };
  analysisSummary: AnalysisSummaryType;
  recommendedTreatment: string;
  analysisItems: Sonography[];
  analysisCount: number;
  ruptureCount: number;
}

const FirstPage = ({
  patientInformation,
  analysisSummary,
  recommendedTreatment,
  analysisItems,
  analysisCount,
  ruptureCount,
}: FirstPageProps) => {
  // 첫 페이지의 analysisItems이 0~1개면 [담당 의사 소견] 표시
  const showAssessment = analysisItems.length < PRINT_CONFIG.FIRST_PAGE_ITEMS;

  return (
    <A4Template key="first-page" pageNumber={1}>
      <PatientInformation patientInformation={patientInformation} />
      <AnalysisSummary analysisSummary={analysisSummary} />
      <RecommendTreatment recommendedTreatment={recommendedTreatment} />
      <AnalysisViewer
        analysisItems={analysisItems}
        analysisCount={analysisCount}
        ruptureCount={ruptureCount}
      />
      {showAssessment && <Assessment />}
    </A4Template>
  );
};

export default FirstPage;
