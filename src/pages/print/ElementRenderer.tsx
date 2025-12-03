import {
  AnalysisResult,
  AnalysisSummary,
  AnalysisViewer,
  Assessment,
  PatientInformation,
  RecommendTreatment,
} from "@/components";
import { ELEMENT } from "@/constants/element";
import { PrintData } from "@/types";
import { checkFalsy } from "@/utils";

interface ElementRendererProps {
  element: string;
  printData: PrintData;
}

/**
 * 요소 렌더링
 * @description 각 요소에 해당하는 HTML이 존재하며 id 중복을 피하기 위해 요소 ID에 컨테이너 ID(ELEMENT.A4_CONTAINER)를 붙여서 사용
 * @description 해당 ID는 Native의 메시지 수신 시, 자동 스크롤 기능에 사용됨
 */
const ElementRenderer = ({ element, printData }: ElementRendererProps) => {
  const {
    patientDetail,
    analysisSummary,
    analysisResultByAI,
    analysisImage,
    physicianAssessment,
  } = printData;

  // 1. 환자 정보
  if (element === ELEMENT.PATIENT_INFORMATION) {
    return (
      <PatientInformation
        id={`${ELEMENT.A4_CONTAINER}-${element}`}
        key={element}
        patientDetail={patientDetail}
      />
    );
  }

  // 2. AI 분석 요약
  if (element === ELEMENT.ANALYSIS_SUMMARY) {
    return (
      <AnalysisSummary
        id={`${ELEMENT.A4_CONTAINER}-${element}`}
        key={element}
        analysisSummary={analysisSummary}
      />
    );
  }

  // 3. AI 종합 결과 분석
  if (element === ELEMENT.RECOMMEND_TREATMENT) {
    return (
      <RecommendTreatment
        id={`${ELEMENT.A4_CONTAINER}-${element}`}
        key={element}
        recommendedTreatment={analysisResultByAI}
      />
    );
  }

  // 4. 분석 이미지 (요약)
  if (element === ELEMENT.ANALYSIS_VIEWER) {
    return (
      <AnalysisViewer
        id={`${ELEMENT.A4_CONTAINER}-${element}`}
        key={element}
        commentSummary={analysisImage.commentSummary}
      />
    );
  }

  // 4. 분석 이미지 (이미지 리스트)
  if (element.includes(ELEMENT.ANALYSIS_RESULT_COMMON)) {
    // element 형식: analysis-result-{index}
    const analysisResultIndex = Number(element.split("-")[2]);
    const analysisItem = analysisImage.analysisItems[analysisResultIndex];

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

  // 5. 담당 의사 소견
  if (element === ELEMENT.ASSESSMENT) {
    return (
      <Assessment
        id={`${ELEMENT.A4_CONTAINER}-${element}`}
        key={element}
        assessment={physicianAssessment}
      />
    );
  }

  return <></>;
};

export default ElementRenderer;
