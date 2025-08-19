const ELEMENT = {
  PATIENT_INFORMATION: "patient-information",
  ANALYSIS_SUMMARY: "analysis-summary",
  RECOMMEND_TREATMENT: "recommend-treatment",
  ANALYSIS_VIEWER: "analysis-viewer",
  ANALYSIS_RESULT_COMMON: "analysis-result",
  ANALYSIS_RESULT: (index: number) => `analysis-result-${index}`,
  ASSESSMENT: "assessment",
};

export { ELEMENT };
