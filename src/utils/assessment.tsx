import { Sonography } from "@/lib";

const EXCEED_ASSESSMENT_LENGTH_IN_FIRST_PAGE = 342;
const EXCEED_ASSESSMENT_LENGTH_IN_REMAINING_PAGE = 741;

const showAssessmentInFirstPage = (
  analysisItems: Sonography[],
  assessment: string
) => {
  const analysisCount = analysisItems.length;

  if (analysisCount === 0) {
    return true;
  }

  if (analysisCount === 1) {
    // [담당 의사 소견] 375자를 초과하면 UI 깨짐.
    if (assessment.length > EXCEED_ASSESSMENT_LENGTH_IN_FIRST_PAGE) {
      return false;
    } else {
      return true;
    }
  }

  if (analysisCount === 2) {
    return false;
  }

  return false;
};

export {
  showAssessmentInFirstPage,
  EXCEED_ASSESSMENT_LENGTH_IN_FIRST_PAGE,
  EXCEED_ASSESSMENT_LENGTH_IN_REMAINING_PAGE,
};
