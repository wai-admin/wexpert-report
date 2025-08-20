import { NumberedList } from "@/components";
import { useMessageStore } from "@/store";
import { checkTruthy, normalizeLineBreaks } from "@/utils/common";

interface AssessmentProps {
  id: string;
}

const Assessment = ({ id }: AssessmentProps) => {
  const { nativeMessage } = useMessageStore();

  const assessment = checkTruthy(nativeMessage)
    ? normalizeLineBreaks(nativeMessage.assessment)
    : "";

  return (
    <div id={id} className="column">
      <NumberedList number={5} title="담당 의사 소견" />
      <div className="comment-box-assessment">{assessment}</div>
    </div>
  );
};

export default Assessment;
