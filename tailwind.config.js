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
        obsidian: {
          DEFAULT: '#0A0B0F',
          surface: '#0C0E14',
          elevated: '#131722',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        card: 'rgba(255, 255, 255, 0.02)',
        electron: {
          400: '#38bdf8',
          500: '#00d2ff',
          600: '#00b4d8',
          glow: '#00f0ff',
        },
        cyanGlow: '#00C8F0',
      },
      boxShadow: {
        bento: '0 8px 32px -4px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
        'bento-hover': '0 16px 48px -8px rgba(0, 200, 240, 0.12), inset 0 1px 0 rgba(0, 200, 240, 0.25)',
        'glow-cyan': '0 0 25px -5px rgba(0, 200, 240, 0.35)',
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
