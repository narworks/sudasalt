import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A2540',
          deep: '#061829',
        },
        gold: {
          DEFAULT: '#D4A843',
          light: '#E8C776',
        },
        cream: '#F0F0E4',
        'ice-blue': '#38BDF8',
        'sea-blue': '#1B4965',
        sepia: '#8B6914',
        parchment: '#F5EFE0',
        'warm-white': '#FAF8F0',
        charcoal: '#1A1A2E',
        mist: '#B2BEC3',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Cormorant Garamond', 'serif'],
        accent: ['Cinzel', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'float-crystal': 'float-crystal 20s infinite linear',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s infinite',
        'bounce-scroll': 'bounce-scroll 2s ease-in-out infinite',
        'sail-right': 'sail-right 60s linear infinite',
        'sail-left': 'sail-left 50s linear infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'wave-flow': 'wave-flow 8s linear infinite',
        'sparkle': 'sparkle 3s ease-in-out infinite',
      },
      keyframes: {
        'float-crystal': {
          '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-20vh) rotate(360deg)', opacity: '0' },
        },
        'pulse-glow': {
          '0%, 100%': { filter: 'drop-shadow(0 0 20px rgba(212,168,67,0.3))' },
          '50%': { filter: 'drop-shadow(0 0 40px rgba(212,168,67,0.6))' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'bounce-scroll': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
        'sail-right': {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(120vw)' },
        },
        'sail-left': {
          '0%': { transform: 'translateX(120vw) scaleX(-1)' },
          '100%': { transform: 'translateX(-120%) scaleX(-1)' },
        },
        'twinkle': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        'wave-flow': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'sparkle': {
          '0%, 100%': { opacity: '0', transform: 'scale(0) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1) rotate(180deg)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
