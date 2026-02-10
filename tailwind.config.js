/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Toss Design System
        toss: {
          blue: '#3182F6',       // 메인 블루
          blue2: '#1B64DA',      // 다크 블루
          blueBg: '#EBF3FE',     // 블루 배경
          gray50: '#F9FAFB',
          gray100: '#F2F4F6',
          gray200: '#E5E8EB',
          gray300: '#D1D6DB',
          gray400: '#B0B8C1',
          gray500: '#8B95A1',
          gray600: '#6B7684',
          gray700: '#4E5968',
          gray800: '#333D4B',
          gray900: '#191F28',
          red: '#F04452',
          green: '#00B493',
          yellow: '#F5A623',
        },
        // 카드사 브랜드 색상
        shinhan: '#005BAC',
        kb: '#FFBC00',
        hyundai: '#002C5F',
        samsung: '#1428A0',
        lotte: '#ED1C24',
        hana: '#00927A',
        woori: '#0066B3',
        nh: '#00A650',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
      },
    },
  },
  plugins: [],
};
