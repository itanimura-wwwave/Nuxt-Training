/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // ...
  ],
  theme: {
    extend: {
      // ここに独自の定義を追加する
      colors: {
        'brand-primary': '#00A474',
        'brand-secondary': '#FFC107',
      },
      fontFamily: {
        // 'sans' を上書きして、サイト全体の基本フォントを変更する
        sans: ['Noto Sans JP', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
