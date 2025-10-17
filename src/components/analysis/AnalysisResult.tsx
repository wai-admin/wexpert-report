import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Sonography } from "@/lib/reportType";
import { Point } from "rulyotano.math.geometry";
import { AnalysisImage } from "@/components";
import { checkTruthy } from "@/utils/common";

interface AnalysisResultProps {
  index: number;
  item: Sonography;
}

const AnalysisResult = ({ index, item }: AnalysisResultProps) => {
  const { t: i18n } = useTranslation();

  const [roiCoordinates, setRoiCoordinates] = useState<Point[][]>([]);

  const { analysis, imageUrl, originalFileName } = item;
  const ruptureResult = analysis?.labels?.find(
    (label) => label?.result_type === "rupture"
  );
  const isRupture = ruptureResult?.result_class === "exist";

  // ROI 좌표 저장
  useEffect(() => {
    if (isRupture) {
      // 각 그룹별로 Point[]로 변환하여 2차원 배열로 저장
      const allGroups = ruptureResult?.points
        .filter(Array.isArray)
        .map((group) =>
          Array.isArray(group)
            ? group.map(
                ([x, y]) =>
                  new Point(
                    Number(String(x).replace(/,/g, "")),
                    Number(String(y).replace(/,/g, ""))
                  )
              )
            : []
        );
      setRoiCoordinates(allGroups);
    }
  }, [isRupture, ruptureResult]);

  // 실리콘 피막 침범 존재 여부 확인
  const invasionToCapsuleResult = analysis?.labels?.find(
    (label) =>
      label?.result_type === "silicone_invasion_to_capsule" &&
      label?.result_class === "exist"
  );
  const isInvasionToCapsuleExist = checkTruthy(invasionToCapsuleResult);

  return (
    <div className="analysis-container" style={{ marginTop: "3.7mm" }}>
      <AnalysisImage
        imageUrl={imageUrl}
        originalFileName={originalFileName}
        coordinates={roiCoordinates}
      />
      <div className="analysis-info-box">
        <p className="analysis-status">
          <span className="analysis-status" style={{ color: "#595959" }}>
            {i18n("complication-images-attached.image-number", { index })}{" "}
          </span>
          |{" "}
          <span
            className="analysis-status"
            style={{ color: isRupture ? "red" : "black" }}
          >
            {isRupture
              ? i18n("complication-images-attached.image-status-rupture")
              : i18n("complication-images-attached.image-status-normal")}
          </span>
        </p>
        <p className="analysis-description">
          {isRupture
            ? `${i18n(
                "complication-images-attached.analysis-result-comment.rupture"
              )} ${
                isInvasionToCapsuleExist
                  ? i18n(
                      "complication-images-attached.analysis-result-comment.invasion-to-capsule"
                    )
                  : i18n(
                      "complication-images-attached.analysis-result-comment.no-invasion-to-capsule"
                    )
              }`
            : i18n(
                "complication-images-attached.analysis-result-comment.normal"
              )}
        </p>
      </div>
    </div>
  );
};

export default AnalysisResult;
