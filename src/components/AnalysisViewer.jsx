import { NumberedList, AnalysisResult } from "@/components";

const AnalysisViewer = ({ analysisItems }) => {
  return (
    <div className="column">
      <NumberedList number={4} title="부작용 감지 이미지 첨부" />
      <div className="comment-box-image">
        총 5장의 이미지 중 2장에서 파열이 감지되었습니다.
      </div>
      {analysisItems.map((item, index) => (
        <AnalysisResult key={item.id} index={index + 1} item={item} />
      ))}
    </div>
  );
};

export default AnalysisViewer;
