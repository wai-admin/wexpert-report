import { Sonography } from "@/lib/reportType";

interface AnalysisResultProps {
  index: number;
  item: Sonography;
}

const AnalysisResult = ({ index, item }: AnalysisResultProps) => {
  const { analysis, imageUrl, originalFileName } = item;
  const ruptureResult = analysis.labels.find(
    (label) => label.result_type === "rupture"
  );
  const isRupture = ruptureResult?.result_class === "exist";
  const roiPoint = ruptureResult?.points;

  return (
    <div className="analysis-container" style={{ marginTop: "14px" }}>
      <img src={imageUrl} alt={originalFileName} className="analysis-img" />
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
