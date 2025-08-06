import {
  PatientInformation,
  AnalysisSummary,
  RecommendTreatment,
  AnalysisViewer,
  A4Template,
  Assessment,
} from "@/components";
import { PRINT_CONFIG } from "@/constants/config";

interface FirstPageProps {
  analysisItems: any[];
}

const FirstPage = ({ analysisItems }: FirstPageProps) => {
  // 첫 페이지의 analysisItems이 0~1개면 [담당 의사 소견] 표시
  const showAssessment = analysisItems.length < PRINT_CONFIG.FIRST_PAGE_ITEMS;

  return (
    <A4Template key="first-page" pageNumber={1}>
      <PatientInformation />
      <AnalysisSummary />
      <RecommendTreatment />
      <AnalysisViewer analysisItems={analysisItems} />
      {showAssessment && <Assessment />}
    </A4Template>
  );
};

export default FirstPage;
