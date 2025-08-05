import { NumberedList } from "@/components";

const RecommendTreatment = () => {
  return (
    <div className="column">
      <NumberedList number={3} title="AI 분석 결과에 따른 추천 치료" />
      <div className="comment-box-recommend">
        보형물 주변에 형성된 <br /> 보형물 주변에 형성된 <br /> 보형물 주변에
        형성된 <br /> 보형물 주변에 형성된 <br /> 보형물 주변에 형성된
      </div>
    </div>
  );
};

export default RecommendTreatment;
