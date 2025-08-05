import {
  PatientInformation,
  AnalysisSummary,
  RecommendTreatment,
  AnalysisViewer,
  A4Template,
} from "@/components";

const FirstPage = ({ analysisItems }) => {
  return (
    <A4Template key="first-page">
      <PatientInformation />
      <AnalysisSummary />
      <RecommendTreatment />
      <AnalysisViewer analysisItems={analysisItems} />
    </A4Template>
  );
};

export default FirstPage;
