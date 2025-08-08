interface CoverProps {
  hospitalName: string;
}

const Cover = ({ hospitalName }: CoverProps) => {
  return (
    <div className="a4-page">
      <div className="a4-content">
        <img src="/images/wai.png" className="cover-logo" />
        <div style={{ marginTop: "120px" }}>
          <h1 className="cover-title-highlight">
            AI 기반 초음파 분석을 활용한
          </h1>
          <h1 className="cover-title-normal">유방 보형물 진단</h1>
        </div>
        <div style={{ marginTop: "20px" }}>
          <p className="cover-description">
            이 보고서는 AI 기반 진단 보조 시스템인
          </p>
          <div className="row align-center">
            <img src="/images/wexpert.png" className="cover-wexpert-logo" />
            <p className="cover-description cover-reposition">
              를 통해 생성된 영상 분석 문서입니다.
            </p>
          </div>
          <div style={{ marginTop: "50px" }}>
            <h1 className="cover-hospital-name">{hospitalName}</h1>
          </div>
        </div>
      </div>
      <div className="cover-footer">
        <img src="/images/background.png" className="cover-background" />
        <p className="cover-footer-text">
          Generated using a platform provided by W.AI Inc.
        </p>
      </div>
    </div>
  );
};

export default Cover;
