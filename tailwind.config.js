/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        /* ── Arctic Obsidian Surface System ── */
        void: '#050507',
        abyss: '#0A0B0F',
        surface: '#0F1117',
        elevated: '#161820',
        'arctic-border': '#1E2028',
        /* ── Text Hierarchy ── */
        'text-primary': '#F0F2F5',
        'text-secondary': '#8B90A0',
        'text-tertiary': '#4A4F60',
        /* ── Accent — Arctic Blue ── */
        accent: {
          DEFAULT: '#4D9EFF',
          dim: '#2A6ECC',
          glow: 'rgba(77, 158, 255, 0.12)',
          subtle: 'rgba(77, 158, 255, 0.06)',
        },
        /* ── Legacy compat ── */
        navy: {
          DEFAULT: '#0A0B0F',
          dark: '#050507',
          light: '#0F1117',
        },
        muted: '#8B90A0',
        ghost: '#4A4F60',
      },
      fontFamily: {
        display: ['"Clash Display"', 'Inter', '-apple-system', 'sans-serif'],
        sans: ['"DM Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ['"Clash Display"', '-apple-system', 'sans-serif'],
      },
      lineHeight: {
        'ultra-tight': '0.88',
        'super-tight': '0.92',
        'editorial': '0.95',
      },
      letterSpacing: {
        'ultra-tight': '-0.04em',
        'super-tight': '-0.03em',
        'tighter': '-0.02em',
        'label': '0.12em',
        'widest': '0.15em',
        'editorial': '0.25em',
      },
      borderRadius: {
        'card': '16px',
        'card-lg': '20px',
      },
      transitionTimingFunction: {
        'expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'cinema': 'cubic-bezier(0.76, 0, 0.24, 1)',
        'quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '700': '700ms',
        '900': '900ms',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'marquee': 'marquee 30s linear infinite',
        'gradient-shift': 'gradientShift 8s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 20px rgba(77, 158, 255, 0.04)' },
          '50%': { boxShadow: '0 0 40px rgba(77, 158, 255, 0.08)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
