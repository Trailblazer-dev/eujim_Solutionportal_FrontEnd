/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navyblue: 'var(--color-navyblue)',
        softgray: 'var(--color-softgray)',
        lightblue: 'var(--color-lightblue)',
      },
      animation: {
        'fade-in-down': 'fadeInDown 0.3s ease-out',
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
