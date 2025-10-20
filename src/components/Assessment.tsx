import { useTranslation } from "react-i18next";
import { NumberedList } from "@/components";
import { normalizeLineBreaks } from "@/utils/common";

interface AssessmentProps {
  id: string;
  assessment: string;
}

const Assessment = ({ id, assessment }: AssessmentProps) => {
  const { t: i18n } = useTranslation();

  return (
    <div id={id} className="column">
      <NumberedList
        number={6}
        title={i18n("numberedList.physician-assessment")}
      />
      <div className="comment-box-assessment">
        {normalizeLineBreaks(assessment)}
      </div>
    </div>
  );
};

export default Assessment;
