import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      <button
        onClick={() => changeLanguage("ko")}
        className={i18n.language === "ko" ? "active" : ""}
      >
        한국어
      </button>
      <button
        onClick={() => changeLanguage("en")}
        className={i18n.language === "en" ? "active" : ""}
      >
        English
      </button>
    </div>
  );
};

export default LanguageSwitcher;
