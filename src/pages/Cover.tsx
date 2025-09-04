interface CoverProps {
  hospitalName: string;
}

const Cover = ({ hospitalName }: CoverProps) => {
  // 이미지 로드 완료시 부드럽게 표시
  const handleLoadImage = (e: any) => {
    const img = e.target;
    img.style.opacity = 1;
  };

  return (
    <div className="a4-page">
      <div className="a4-content">
        <div style={{ marginTop: "140px" }}>
          <h1 className="cover-title-highlight">AI를 활용한</h1>
          <h1 className="cover-title-normal">유방 보형물 진단</h1>
        </div>
        <div style={{ marginTop: "50px" }}>
          <h1 className="cover-hospital-name">{hospitalName}</h1>
        </div>
      </div>
      <div className="cover-footer">
        <img
          src="/images/background.webp"
          className="cover-background"
          style={{ opacity: "0", transition: "opacity 0.5s ease" }}
          onLoad={handleLoadImage}
        />
        <p className="cover-footer-text">
          Generated using a platform provided by W.AI Inc.
        </p>
      </div>
    </div>
  );
};

export default Cover;
