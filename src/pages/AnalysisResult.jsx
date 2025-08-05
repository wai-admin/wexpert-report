const AnalysisResult = ({ index, item }) => {
  const { status, description } = item;

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        height: "160px",
        marginTop: "14px",
      }}
    >
      <div
        style={{
          width: "220px",
          height: "160px",
          backgroundColor: "black",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "14px",
          padding: "4px 0",
        }}
      >
        <p style={{ fontSize: "13px", fontWeight: "500", color: "black" }}>
          {index}번 이미지 | {status}
        </p>
        <p
          style={{
            fontSize: "13px",
            fontWeight: "400",
            color: "black",
            marginTop: "8px",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default AnalysisResult;
