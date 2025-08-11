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
  const ruptureResult = analysis.labels.find(
    (label) => label.result_type === "rupture"
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
        {/* <p className="analysis-description">{description}</p> */}
      </div>
    </div>
  );
};

export default AnalysisResult;
