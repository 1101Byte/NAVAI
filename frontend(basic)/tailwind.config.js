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
          blue: '#3E84C5',
          cyan: '#16BAE7',
          'blue-light': '#5a9fd4',
          'cyan-light': '#4dd4f7',
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
