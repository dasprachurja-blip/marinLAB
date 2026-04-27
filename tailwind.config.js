/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0A0B10', dark: '#050508', light: '#12141D' },
        teal: { DEFAULT: '#FF2A55', dark: '#FF5500' },
        muted: '#A0B4C8',
      },
      fontFamily: {
        sans: ['Space Grotesk', '-apple-system', 'sans-serif'],
        heading: ['Oswald', 'sans-serif'],
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
          '0%,100%': { boxShadow: '0 0 20px rgba(255,42,85,0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(255,42,85,0.5)' },
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
