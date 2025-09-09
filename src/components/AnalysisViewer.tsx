import { useTranslation } from "react-i18next";
import { NumberedList } from "@/components";

interface AnalysisViewerProps {
  id: string;
  analysisCount: number;
  ruptureCount: number;
}

const AnalysisViewer = ({
  id,
  analysisCount,
  ruptureCount,
}: AnalysisViewerProps) => {
  const { t: i18n } = useTranslation();
  const hasRupture = ruptureCount > 0;

  return (
    <div id={id} className="column">
      <NumberedList
        number={4}
        title={i18n("numberedList.complication-images-attached")}
      />
      <div className="comment-box-image">
        {hasRupture ? (
          <>
            {i18n("complication-images-attached.rupture-comment", {
              analysisCount,
              ruptureCount,
            })}
          </>
        ) : (
          <>
            {i18n("complication-images-attached.no-rupture-comment", {
              analysisCount,
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default AnalysisViewer;
