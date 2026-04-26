/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#081F3D', dark: '#050F1E', light: '#0B2A4A' },
        teal: { DEFAULT: '#48D9B4', dark: '#2B82AD' },
        muted: '#A0B4C8',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.02em',
        widest: '0.15em',
      },
      animation: {
        'pulse-glow': 'pulseGlow 1.8s ease-in-out infinite',
        'float': 'float 5s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'ping-slow': 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 20px rgba(72,217,180,0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(72,217,180,0.5)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
}
