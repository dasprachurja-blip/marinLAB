/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#040714', dark: '#040714', light: '#0B1225' },
        primary: { DEFAULT: '#2563EB', hover: '#3B82F6', active: '#1D4ED8' },
        accent: { purple: '#8B5CF6', emerald: '#10B981' },
        muted: '#64748B',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'sans-serif'],
        heading: ['Inter', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.02em',
        widest: '0.15em',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'float': 'float 5s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'ping-slow': 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 15px rgba(37, 99, 235, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(37, 99, 235, 0.4)' },
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
