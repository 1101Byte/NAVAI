/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Pluto logo palette (keep token names to avoid breaking classes)
          blue: '#202068',
          cyan: '#e058a0',
          'blue-light': '#304898',
          'cyan-light': '#5888b0',
        },
      },
      animation: {
        'typing-dot': 'typing-dot 1.4s ease-in-out infinite both',
        'cursor-blink': 'cursor-blink 0.8s step-end infinite',
        'chat-window-enter': 'chat-window-enter 0.5s ease-out both',
      },
      keyframes: {
        'typing-dot': {
          '0%, 80%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '40%': { opacity: '1', transform: 'scale(1)' },
        },
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'chat-window-enter': {
          '0%': { opacity: '0', transform: 'scale(0.96) translateY(12px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
