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
        background: "var(--tw-bg)",
        background1: "var(--tw-bg1)",
        foreground: "var(--tw-text)",
        inverseForground: "var(--tw-inverseTxt)",
        thTxt: "var(--tw-thTxt)",
        selectedBg: "var(--tw-selectedBg)",
        outline1: "var(--tw-outline1)",
        signature: "var(--tw-signature)",
        signature2: "var(--tw-signature2)",
        fall: "var(--tw-fall)",
      },
    },
  },
  safelist: ["bg-fall", "text-signature2"],
  plugins: [],
};
