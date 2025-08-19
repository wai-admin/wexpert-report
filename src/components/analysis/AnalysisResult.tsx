import { useState, useEffect } from "react";
import { AnalysisImage } from "@/components";
import { Sonography } from "@/lib/reportType";
import { Point } from "rulyotano.math.geometry";

interface AnalysisResultProps {
  index: number;
  item: Sonography;
}

const AnalysisResult = ({ index, item }: AnalysisResultProps) => {
  const [roiCoordinates, setRoiCoordinates] = useState<Point[][]>([]);

  const { analysis, imageUrl, originalFileName } = item;
  const ruptureResult = analysis?.labels?.find(
    (label) => label?.result_type === "rupture"
  );
  const isRupture = ruptureResult?.result_class === "exist";

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

  return (
    <div className="analysis-container" style={{ marginTop: "14px" }}>
      <AnalysisImage
        imageUrl={imageUrl}
        originalFileName={originalFileName}
        coordinates={roiCoordinates}
      />
      <div className="analysis-info-box">
        <p className="analysis-status">
          <span className="analysis-status" style={{ color: "#595959" }}>
            {index}번 이미지{" "}
          </span>
          |{" "}
          <span
            className="analysis-status"
            style={{ color: isRupture ? "red" : "black" }}
          >
            {isRupture ? "파열" : "정상"}
          </span>
        </p>
        <p className="analysis-description">
          {isRupture
            ? "현재 이미지 내 색깔로 표시된 해당 영역은 AI 분석 결과 파열 소견이 나타나는 부위입니다."
            : "분석 결과, 현재 이미지에서는 파열 등 특이 소견이 관찰되지 않았습니다."}
        </p>
      </div>
    </div>
  );
};

export default AnalysisResult;
