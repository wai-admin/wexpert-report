import { useTranslation } from "react-i18next";
import { NumberedList } from "@/components";
import { getImageCommentSummary } from "@/utils";

interface AnalysisViewerProps {
  id: string;
  totalAnalysisImageCount: number;
  ruptureImageCount: number;
  invasionToCapsuleExist: boolean;
  invasionToLymphNodeExist: boolean;
}

const AnalysisViewer = (props: AnalysisViewerProps) => {
  const { id, ...commentProps } = props;
  const { t: i18n } = useTranslation();
  const comment = getImageCommentSummary(commentProps);

  return (
    <div id={id} className="column">
      <NumberedList
        number={4}
        title={i18n("numberedList.complication-images-attached")}
      />
      <div className="comment-box-image">{comment}</div>
    </div>
  );
};

export default AnalysisViewer;
