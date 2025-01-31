/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "var(--noto_sans_kr), sans-serif",
      },
      colors: {
        background: "var(--tw-bg)", // 배경색
        background1: "var(--tw-bg1)", // 배경색
        foreground: "var(--tw-text)", // 글자색
        inverseForground: "var(--tw-inverseTxt)", // 글자색 반전색

        rise: "#a6fc35", // 상승 주가 표시
        fall: "#F6465D", // 하락 주가 표시
        signature: "#a6fc35", // 웹사이트 시그니처 색상
        signature2: "#fcd535", // 웹사이트 시그니처 색상2
        outline1: "#2b3139", // 외곽선 색상1

        thTxt: "#626A76",
        selectedBg: "#1E2026",
      },
    },
  },
  plugins: [],
};
