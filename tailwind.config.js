/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  corePlugins: {
    preflight: true,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", "sans-serif"], // 기본 font-sans 오버라이드
        pretendard: ["Pretendard", "sans-serif"], // 필요 시 개별 사용도 가능
      },
      colors: {
        "blue-50": "rgb(186, 206, 242)",
        "blue-100": "rgb(117, 157, 230)",
        "blue-200": "rgb(83, 132, 223)",
        "blue-300": "rgb(48, 107, 217)",
        "blue-400": "rgb(35, 89, 190)",
        "blue-500": "rgb(28, 73, 155)",
        "blue-600": "rgb(22, 57, 121)",
        "blue-700": "rgb(16, 41, 86)",
        "blue-800": "rgb(13, 31, 68)",
        "blue-900": "rgb(10, 24, 51)",

        "gray-50": "rgb(216, 221, 233)",
        "gray-100": "rgb(189, 198, 219)",
        "gray-200": "rgb(150, 163, 197)",
        "gray-300": "rgb(123, 140, 183)",
        "gray-400": "rgb(97, 117, 168)",
        "gray-500": "rgb(80, 98, 145)",
        "gray-600": "rgb(65, 80, 118)",
        "gray-700": "rgb(51, 62, 92)",
        "gray-800": "rgb(36, 45, 66)",
        "gray-900": "rgb(21, 28, 40)",

        "purple-200": "rgb(201, 137, 231)",
        "purple-300": "rgb(181, 94, 222)",
        "purple-400": "rgb(162, 52, 213)",
        "purple-500": "rgb(133, 37, 177)",
        "purple-600": "rgb(101, 28, 135)",

        // extended colors
        "subtle-transparent-20": "rgba(255, 255, 255, 0.13)",
        "subtle-transparent-7": "rgba(255, 255, 255, 0.07)",
        "subtle-transparent-5": "rgba(255, 255, 255, 0.07)",

        "grey-transparent-60": "rgba(26, 28, 30, 0.6)",
        "grey-transparent-30": "rgba(108, 116, 137, 0.3)",
        "grey-transparent-12": "rgba(105, 114, 123, 0.12)",

        "base-color-transparent-purple-15": "rgba(162, 52, 213, 0.15)",
        "base-color-transparent-orange-15": "rgba(221, 130, 107, 0.15)",

        "red-color-transparent-15": "rgba(221, 107, 107, 0.15)",
        "red-color-transparent-lt-15": "rgba(230, 147, 147, 0.15)",
        "red-color-transparent-dk-15": "rgba(182, 42, 42, 0.15)",

        "blue-color-transparent-60": "rgba(47, 122, 197, 0.6)",
        "blue-color-transparent-15": "rgba(20, 134, 255, 0.15)",
        "blue-color-transparent-lt-15": "rgba(122, 187, 255, 0.15)",
        "blue-color-transparent-dk-15": "rgba(0, 84, 173, 0.15)",

        "green-color-transparent-15": "rgba(34, 211, 167, 0.15)",
        "green-color-transparent-lt-15": "rgba(115, 232, 203, 0.15)",
        "green-color-transparent-dk-15": "rgba(20, 123, 97, 0.15)",

        "bg-base": "rgba(39, 41, 44, 1)",
        "bg-base-alt": "rgba(26, 28, 30, 1)",
        "bg-base-error": "rgba(152, 54, 75, 1)",

        "solid-dk": "rgba(62, 66, 70, 1)",
        "solid-lt": "rgba(145, 145, 148, 1)",
        "solid-focus": "rgba(117, 157, 230, 1)",

        "text-primary": "rgba(255, 255, 255, 1)",
        "text-secondary": "rgba(212, 214, 220, 1)",
        "text-tertiary": "rgba(185, 189, 199, 1)",
      },
      screens: {
        mobile: "0px",
        tablet: "441px", // 441px 이상
        desktop: "769px", // 769px 이상
        wide: "1200px", // 1200px 이상
        mobileOnly: { raw: "(min-width: 0px) and (max-width: 440px)" },
        tabletOnly: { raw: "(min-width: 441px) and (max-width: 768px)" },
        desktopOnly: { raw: "(min-width: 769px) and (max-width: 1199px)" },
        wideOnly: { raw: "(min-width: 1200px)" },
      },
    },
  },
  plugins: [],
};
