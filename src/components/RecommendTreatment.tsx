import { NumberedList } from "@/components";
import { normalizeLineBreaks } from "@/utils/common";

interface RecommendTreatmentProps {
  id: string;
  recommendedTreatment: string;
}

const RecommendTreatment = ({
  id,
  recommendedTreatment,
}: RecommendTreatmentProps) => {
  return (
    <div id={id} className="column">
      <NumberedList number={3} title="AI 분석 결과에 따른 추천 치료" />
      <div className="comment-box-recommend">
        {normalizeLineBreaks(recommendedTreatment)}
      </div>
    </div>
  );
};

export default RecommendTreatment;
