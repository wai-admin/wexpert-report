import { useTranslation } from "react-i18next";
import { Sonography, AnalysisLabel } from "@/lib/reportType";
import { ROICoordinate } from "@/utils/roi";
import { AnalysisImage } from "@/components";
import {
  getImageStatus,
  getEachImageComment,
  getAnalysisResult,
  getAnalysisResultExist,
  getRoiCoordinates,
} from "@/utils";

interface AnalysisResultProps {
  index: number;
  item: Sonography;
}

const AnalysisResult = ({ index, item }: AnalysisResultProps) => {
  const { t: i18n } = useTranslation();
  const { type, analysis, imageUrl, originalFileName } = item;

  // 분석 결과
  const analysisResult: AnalysisLabel | undefined = getAnalysisResult({
    type,
    analysis,
  });
  // 분석 결과 좌표
  const roiCoordinates: ROICoordinate[][] | undefined =
    getRoiCoordinates(analysisResult);
  const {
    isRuptureExist,
    isInvasionToCapsuleExist,
    isInvasionToLymphNodeExist,
  } = getAnalysisResultExist({
    analysis,
  });
  // 분석 결과 설명
  const comment = getEachImageComment({
    type,
    isRuptureExist,
    isInvasionToCapsuleExist,
    isInvasionToLymphNodeExist,
    i18n: i18n,
  });
  // 이미지 상태
  const imageStatusInfo = getImageStatus({
    type,
    isRuptureExist,
    isInvasionToLymphNodeExist,
    i18n: i18n,
  });

  return (
    <div className="analysis-container" style={{ marginTop: "3.7mm" }}>
      <AnalysisImage
        imageUrl={imageUrl}
        originalFileName={originalFileName}
        coordinates={roiCoordinates || []}
      />
      <div className="analysis-info-box">
        <p className="analysis-status">
          <span className="analysis-status" style={{ color: "#595959" }}>
            {i18n("complication-images-attached.image-number", { index })}{" "}
          </span>
          |{" "}
          <span
            className="analysis-status"
            style={{ color: imageStatusInfo?.color }}
          >
            {imageStatusInfo?.text}
          </span>
        </p>
        <p className="analysis-description">{comment}</p>
      </div>
    </div>
  );
};

export default AnalysisResult;
