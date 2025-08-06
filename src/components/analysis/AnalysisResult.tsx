const AnalysisResult = ({ index, item }) => {
  const { status, description } = item;

  return (
    <div className="analysis-container" style={{ marginTop: "14px" }}>
      <div className="analysis-img" />
      <div className="analysis-info-box">
        <p className="analysis-status">
          {index}번 이미지 | {status}
        </p>
        <p className="analysis-description">{description}</p>
      </div>
    </div>
  );
};

export default AnalysisResult;
