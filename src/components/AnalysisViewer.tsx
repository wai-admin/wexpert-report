import { useTranslation } from "react-i18next";
import { NumberedList } from "@/components";

interface AnalysisViewerProps {
  id: string;
  analysisCount: number;
  ruptureCount: number;
  invasionToCapsuleExist: boolean;
  invasionToLnExist: boolean;
}

const AnalysisViewer = ({
  id,
  analysisCount,
  ruptureCount,
  invasionToCapsuleExist,
  invasionToLnExist,
}: AnalysisViewerProps) => {
  const { t: i18n } = useTranslation();

  const getComment = () => {
    const hasRupture = ruptureCount > 0;

    if (hasRupture === false) {
      return i18n("complication-images-attached.no-rupture-comment", {
        analysisCount,
      });
    } else {
      const ruptureComment = i18n(
        "complication-images-attached.rupture-comment",
        {
          analysisCount,
          ruptureCount,
        }
      );

      if (invasionToCapsuleExist) {
        if (invasionToLnExist) {
          return (
            ruptureComment +
            "\n" +
            i18n(
              "complication-images-attached.invasion-to-capsule-ln-exist-comment"
            )
          );
        } else {
          return (
            ruptureComment +
            "\n" +
            i18n(
              "complication-images-attached.invasion-to-capsule-exist-but-no-ln-comment"
            )
          );
        }
      } else {
        if (invasionToLnExist) {
          return (
            ruptureComment +
            "\n" +
            i18n("complication-images-attached.invasion-to-ln-exist-comment")
          );
        } else {
          return (
            ruptureComment +
            "\n" +
            i18n("complication-images-attached.no-invasion-to-ln-comment")
          );
        }
      }
    }
  };

  return (
    <div id={id} className="column">
      <NumberedList
        number={4}
        title={i18n("numberedList.complication-images-attached")}
      />
      <div className="comment-box-image">{getComment()}</div>
    </div>
  );
};

export default AnalysisViewer;
