import {
  PatientInformation,
  AnalysisSummary,
  RecommendTreatment,
  AnalysisViewer,
  A4Template,
  Assessment,
} from "@/components";
import { AnalysisSummary as AnalysisSummaryType, Sonography } from "@/lib";
import { showAssessmentInFirstPage } from "@/utils";

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
  assessment: string;
}

const FirstPage = ({
  patientInformation,
  analysisSummary,
  recommendedTreatment,
  analysisItems,
  analysisCount,
  ruptureCount,
  assessment,
}: FirstPageProps) => {
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
      {showAssessmentInFirstPage(analysisItems, assessment) && <Assessment />}
    </A4Template>
  );
};

export default FirstPage;
