import { NumberedList } from "@/components";

interface RecommendTreatmentProps {
  recommendedTreatment: string;
}

const RecommendTreatment = ({
  recommendedTreatment,
}: RecommendTreatmentProps) => {
  return (
    <div className="column">
      <NumberedList number={3} title="AI 분석 결과에 따른 추천 치료" />
      <div className="comment-box-recommend">{recommendedTreatment}</div>
    </div>
  );
};

export default RecommendTreatment;
