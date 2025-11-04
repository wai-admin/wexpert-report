import { useTranslation } from "react-i18next";
import { NumberedList } from "@/components";

interface AnalysisViewerProps {
  id: string;
  totalAnalysisImageCount: number;
  lymphNodeImageCount: number;
  ruptureImageCount: number;
  invasionToCapsuleExist: boolean;
  invasionToLymphNodeExist: boolean;
}

const AnalysisViewer = ({
  id,
  totalAnalysisImageCount,
  lymphNodeImageCount,
  ruptureImageCount,
  invasionToCapsuleExist,
  invasionToLymphNodeExist,
}: AnalysisViewerProps) => {
  const { t: i18n } = useTranslation();

  const getComment = () => {
    const hasLymphNode = lymphNodeImageCount > 0;
    const hasRupture = ruptureImageCount > 0;

    if (hasRupture === false) {
      return i18n("complication-images-attached.no-rupture-comment", {
        totalAnalysisImageCount,
      });
    } else {
      const ruptureComment = i18n(
        "complication-images-attached.rupture-comment",
        {
          totalAnalysisImageCount,
          ruptureImageCount,
        }
      );

      // 실리콘 피막 침범 감지된 경우
      if (invasionToCapsuleExist) {
        // 림프절 이미지가 있는 경우
        if (hasLymphNode) {
          // 림프절 침범 감지된 경우
          if (invasionToLymphNodeExist) {
            return (
              ruptureComment +
              "\n" +
              i18n(
                "complication-images-attached.invasion-to-capsule-ln-exist-comment"
              )
            );
          } else {
            // 림프절 침범 감지되지 않은 경우
            return (
              ruptureComment +
              "\n" +
              i18n(
                "complication-images-attached.invasion-to-capsule-exist-but-no-ln-comment"
              )
            );
          }
        } else {
          // 림프절 이미지가 없는 경우
          return (
            ruptureComment +
            "\n" +
            i18n(
              "complication-images-attached.invasion-to-capsule-exist-comment"
            )
          );
        }
        // 실리콘 피막 침범 감지되지 않은 경우
      } else {
        // 림프절 이미지가 있는 경우
        if (hasLymphNode) {
          // 림프절 침범 감지된 경우
          if (invasionToLymphNodeExist) {
            return (
              ruptureComment +
              "\n" +
              i18n("complication-images-attached.invasion-to-ln-exist-comment")
            );
          } else {
            // 림프절 침범 감지되지 않은 경우
            return (
              ruptureComment +
              "\n" +
              i18n("complication-images-attached.no-invasion-to-ln-comment")
            );
          }
        } else {
          // 림프절 이미지가 없는 경우
          return ruptureComment;
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
