import { useTranslation } from "react-i18next";
import { NumberedList } from "@/components";

interface AnalysisViewerProps {
  id: string;
  commentSummary: string;
}

const AnalysisViewer = ({ id, commentSummary }: AnalysisViewerProps) => {
  const { t: i18n } = useTranslation();

  return (
    <div id={id} className="column">
      <NumberedList
        number={4}
        title={i18n("numberedList.complication-images-attached")}
      />
      <div className="comment-box-image">{commentSummary}</div>
    </div>
  );
};

export default AnalysisViewer;
