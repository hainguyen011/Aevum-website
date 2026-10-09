/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: '#07090D',
        card: 'rgba(255, 255, 255, 0.02)',
        electron: {
          400: '#38bdf8',
          500: '#00d2ff',
          600: '#00b4d8',
          glow: '#00f0ff',
        }
      },
      fontFamily: {
        sans: ['"Google Sans Flex"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        display: ['"Google Sans Flex"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        quote: ['"Encode Sans Condensed"', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.025em',
      }
    }
  },
  plugins: [],
};
