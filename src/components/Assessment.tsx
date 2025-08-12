import { NumberedList } from "@/components";
import { useMessageStore } from "@/store";
import { checkTruthy } from "@/utils/common";

const Assessment = () => {
  const { nativeMessage } = useMessageStore();

  const assessment = checkTruthy(nativeMessage) ? nativeMessage.assessment : "";

  return (
    <div className="column">
      <NumberedList number={5} title="담당 의사 소견" />
      <div className="comment-box-assessment">{assessment}</div>
    </div>
  );
};

export default Assessment;
