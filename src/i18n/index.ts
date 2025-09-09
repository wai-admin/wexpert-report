import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 번역 파일들
import koTranslation from "./locales/ko/translation.json";
import enTranslation from "./locales/en/translation.json";

const resources = {
  ko: {
    translation: koTranslation,
  },
  en: {
    translation: enTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ko", // 기본 언어
  fallbackLng: "ko", // 번역이 없을 때 사용할 언어

  interpolation: {
    escapeValue: false, // React는 이미 XSS 보호가 있음
  },
});

export default i18n;
