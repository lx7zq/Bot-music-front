/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans Thai"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        display: ['"Baloo 2"', '"Noto Sans Thai"', 'sans-serif'],
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
        honey: {
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
        },
        cream: '#FFF7ED',
      },
      boxShadow: {
        sticker: '4px 4px 0 0 #534AB7',
        'sticker-sm': '2px 2px 0 0 #534AB7',
      },
      keyframes: {
        'fade-in': { from: { opacity: 0, transform: 'translateY(6px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        'pulse-dot': { '0%,100%': { opacity: 1 }, '50%': { opacity: .3 } },
        'bar': { '0%,100%': { transform: 'scaleY(0.3)' }, '50%': { transform: 'scaleY(1)' } },
        'float': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        'wiggle': { '0%,100%': { transform: 'rotate(-3deg)' }, '50%': { transform: 'rotate(3deg)' } },
        'marquee': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'pop-in': { from: { opacity: 0, transform: 'scale(.9) translateY(8px)' }, to: { opacity: 1, transform: 'scale(1) translateY(0)' } },
      },
      animation: {
        'fade-in': 'fade-in .35s ease both',
        'spin-slow': 'spin-slow 8s linear infinite',
        'pulse-dot': 'pulse-dot 1.5s ease-in-out infinite',
        'bar1': 'bar 1.1s ease-in-out infinite',
        'bar2': 'bar 1.1s ease-in-out .2s infinite',
        'bar3': 'bar 1.1s ease-in-out .4s infinite',
        'float': 'float 3s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'marquee': 'marquee 12s linear infinite',
        'pop-in': 'pop-in .25s ease both',
      },
    },
  },
  plugins: [],
}
