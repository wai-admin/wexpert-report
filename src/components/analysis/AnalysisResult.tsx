import { useTranslation } from "react-i18next";
import { Sonography, AnalysisLabel } from "@/lib/reportType";
import { Point } from "rulyotano.math.geometry";
import { AnalysisImage } from "@/components";
import { checkTruthy } from "@/utils/common";

interface AnalysisResultProps {
  index: number;
  item: Sonography;
}

const AnalysisResult = ({ index, item }: AnalysisResultProps) => {
  const { t: i18n } = useTranslation();
  const { type, analysis, imageUrl, originalFileName } = item;

  const getDescription = (
    type: string,
    isExisted: boolean,
    isInvasionToCapsuleExist: boolean
  ) => {
    if (type === "LYMPH_NODE") {
      if (isExisted) {
        return (
          i18n("complication-images-attached.analysis-result-comment.rupture") +
          "\n" +
          i18n(
            "complication-images-attached.analysis-result-comment.invasion-to-ln"
          )
        );
      } else {
        return (
          i18n("complication-images-attached.analysis-result-comment.rupture") +
          "\n" +
          i18n(
            "complication-images-attached.analysis-result-comment.no-invasion-to-ln"
          )
        );
      }
    } else if (type === "BREAST_IMPLANT") {
      if (isExisted) {
        if (isInvasionToCapsuleExist) {
          return (
            i18n(
              "complication-images-attached.analysis-result-comment.rupture"
            ) +
            "\n" +
            i18n(
              "complication-images-attached.analysis-result-comment.invasion-to-capsule"
            )
          );
        } else {
          return i18n(
            "complication-images-attached.analysis-result-comment.rupture"
          );
        }
      } else {
        return i18n(
          "complication-images-attached.analysis-result-comment.normal"
        );
      }
    }

    // 예외 처리
    return "";
  };

  const getAnalysisResult = () => {
    if (type === "LYMPH_NODE") {
      return analysis?.labels?.find(
        (label) => label?.result_type === "silicone_invasion_to_ln"
      );
    } else if (type === "BREAST_IMPLANT") {
      return analysis?.labels?.find(
        (label) => label?.result_type === "rupture"
      );
    }

    // 예외 처리
    return null;
  };

  // ROI 좌표 저장
  const getRoiCoordinates = () => {
    return analysisResult?.points
      .filter(Array.isArray)
      .map((group: any) =>
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
  };

  // WARNING: 림프 노드는 무조건 파열이 되어있음.
  // 파열 or 정상
  const getRuptureExist = (isValid: boolean) => {
    if (type === "LYMPH_NODE") {
      return true;
    }

    if (type === "BREAST_IMPLANT" && isValid) {
      return true;
    }

    return false;
  };

  // 분석 결과
  const analysisResult: AnalysisLabel | null | undefined = getAnalysisResult();
  // 분석 결과 좌표
  const roiCoordinates: Point[][] | undefined = getRoiCoordinates();
  // 실리콘 피막 침범 존재 여부 확인
  const isInvasionToCapsuleExist = checkTruthy(
    analysis?.labels?.find(
      (label) =>
        label?.result_type === "silicone_invasion_to_capsule" &&
        label?.result_class === "exist"
    )
  );
  // 분석 결과 존재 여부 확인
  const isExist = analysisResult?.result_class === "exist";
  // 파열 존재 여부 확인
  const isRuptureExist = getRuptureExist(isExist);
  // 분석 결과 설명
  const description = getDescription(type, isExist, isInvasionToCapsuleExist);

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
            style={{ color: isRuptureExist ? "red" : "black" }}
          >
            {isRuptureExist
              ? i18n("complication-images-attached.image-status-rupture")
              : i18n("complication-images-attached.image-status-normal")}
          </span>
        </p>
        <p className="analysis-description">{description}</p>
      </div>
    </div>
  );
};

export default AnalysisResult;
