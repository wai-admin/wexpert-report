import { NumberedList } from "@/components";

const Assessment = () => {
  return (
    <div className="column">
      <NumberedList number={5} title="담당 의사 소견" />
      <div className="comment-box-assessment">
        AI 분석 결과와 일치하게, 피막 내 실리콘 침범이 관찰되어 실리콘 보형물
        파열로 판단됩니다. 이에 피막 제거술이 가능한 성형외과 전문의의 진료를
        받으실 것을 권합니다.
      </div>
    </div>
  );
};

export default Assessment;
