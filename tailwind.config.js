/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans Thai"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      colors: {
        iris: {
          50:  '#EEEDFE',
          100: '#CECBF6',
          200: '#AFA9EC',
          400: '#7F77DD',
          500: '#534AB7',
          600: '#3C3489',
          900: '#26215C',
        },
      },
      keyframes: {
        'fade-in': { from: { opacity: 0, transform: 'translateY(6px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        'pulse-dot': { '0%,100%': { opacity: 1 }, '50%': { opacity: .3 } },
        'bar': { '0%,100%': { transform: 'scaleY(0.3)' }, '50%': { transform: 'scaleY(1)' } },
      },
      animation: {
        'fade-in': 'fade-in .35s ease both',
        'spin-slow': 'spin-slow 8s linear infinite',
        'pulse-dot': 'pulse-dot 1.5s ease-in-out infinite',
        'bar1': 'bar 1.1s ease-in-out infinite',
        'bar2': 'bar 1.1s ease-in-out .2s infinite',
        'bar3': 'bar 1.1s ease-in-out .4s infinite',
      },
    },
  },
  plugins: [],
}
