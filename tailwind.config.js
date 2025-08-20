/** @type {import('tailwindcss').Config} */
import animate from 'tailwindcss-animate';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary: '#1E3A8A', // Azul escuro
        accent: '#DC2626',  // Vermelho suave
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }, // ← Aqui é o segredo!
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(50%)' }, // ← Reverso da lógica
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out',
        marquee: 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
      },

    },
  },
  plugins: [animate],
};
