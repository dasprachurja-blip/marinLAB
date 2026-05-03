/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0B0C10', dark: '#040405', light: '#16181D' },
        primary: { DEFAULT: '#8BA3C6', hover: '#A5BBE0', active: '#728BB1' },
        accent: { purple: '#8B5CF6', emerald: '#10B981' },
        muted: '#A1A1AA',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'sans-serif'],
        heading: ['"Space Grotesk"', '-apple-system', 'sans-serif'],
      },
      lineHeight: {
        'ultra-tight': '0.85',
        'super-tight': '0.9',
      },
      letterSpacing: {
        'ultra-tight': '-0.04em',
        'super-tight': '-0.03em',
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
