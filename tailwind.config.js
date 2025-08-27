/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}', // 根目录入口
    './{app,src,components}/**/*.{js,jsx,ts,tsx}', // 常见源码目录
    './**/*.{js,jsx,ts,tsx}', // 兜底：保证其它目录也能匹配
    '!./node_modules', // 排除依赖
    '!./.expo', // 排除 Expo 临时目录
    '!./dist' // 排除打包结果
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#030014',
        secondary: '#151312',
        light: {
          100: '#D6C7FF',
          200: '#A8B5DB',
          300: '#9CA4AB'
        },
        dark: {
          100: '#221F3D',
          200: '#0F0D23'
        },
        accent: '#AB8BFF'
      }
    }
  },
  plugins: []
};
