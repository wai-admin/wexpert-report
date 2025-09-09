import { useTranslation } from "react-i18next";

interface CoverProps {
  hospitalName: string;
}

const Cover = ({ hospitalName }: CoverProps) => {
  const { t: i18n } = useTranslation();

  // 이미지 로드 완료시 부드럽게 표시
  const handleLoadImage = (e: any) => {
    const img = e.target;
    img.style.opacity = 1;
  };

  return (
    <div className="a4-page">
      <div className="a4-content">
        <div style={{ marginTop: "36.7mm" }}>
          <h1 className="cover-title-highlight">
            {i18n("cover.title-highlight")}
          </h1>
          <h1 className="cover-title-normal">{i18n("cover.title-normal")}</h1>
        </div>
        <div style={{ marginTop: "13.3mm" }}>
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
        <p className="cover-footer-text">{i18n("cover.footer-text")}</p>
      </div>
    </div>
  );
};

export default Cover;
