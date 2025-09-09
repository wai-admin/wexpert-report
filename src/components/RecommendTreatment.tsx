import { NumberedList } from "@/components";
import { useTranslation } from "react-i18next";
import { normalizeLineBreaks } from "@/utils/common";

interface RecommendTreatmentProps {
  id: string;
  recommendedTreatment: string;
}

const RecommendTreatment = ({
  id,
  recommendedTreatment,
}: RecommendTreatmentProps) => {
  const { t: i18n } = useTranslation();

  return (
    <div id={id} className="column">
      <NumberedList
        number={3}
        title={i18n("numberedList.recommend-treatment-based-on-ai-analysis")}
      />
      <div className="comment-box-recommend">
        {normalizeLineBreaks(recommendedTreatment)}
      </div>
    </div>
  );
};

export default RecommendTreatment;
