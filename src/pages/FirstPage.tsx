import {
  PatientInformation,
  AnalysisSummary,
  RecommendTreatment,
  AnalysisViewer,
  A4Template,
} from "@/components";

interface FirstPageProps {
  analysisItems: any[];
}

const FirstPage = ({ analysisItems }: FirstPageProps) => {
  return (
    <A4Template key="first-page" pageNumber={1}>
      <PatientInformation />
      <AnalysisSummary />
      <RecommendTreatment />
      <AnalysisViewer analysisItems={analysisItems} />
    </A4Template>
  );
};

export default FirstPage;
