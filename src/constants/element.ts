const ELEMENT = {
  A4_CONTAINER: "a4-container",
  PATIENT_INFORMATION: "patient-information",
  ANALYSIS_SUMMARY: "analysis-summary",
  RECOMMEND_TREATMENT: "recommend-treatment",
  RUPTURE_RISK_LEVEL: "rupture-risk-level",
  ANALYSIS_VIEWER: "analysis-viewer",
  ANALYSIS_RESULT_COMMON: "analysis-result",
  ANALYSIS_RESULT: (index: number) => `analysis-result-${index}`,
  ASSESSMENT: "assessment",
};

export { ELEMENT };
