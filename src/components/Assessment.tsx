import { NumberedList } from "@/components";
import { normalizeLineBreaks } from "@/utils/common";

interface AssessmentProps {
  id: string;
  assessment: string;
}

const Assessment = ({ id, assessment }: AssessmentProps) => {
  return (
    <div id={id} className="column">
      <NumberedList number={5} title="담당 의사 소견" />
      <div className="comment-box-assessment">
        {normalizeLineBreaks(assessment)}
      </div>
    </div>
  );
};

export default Assessment;
