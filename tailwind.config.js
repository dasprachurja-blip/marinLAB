/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        /* ── Obsidian Surface System ── */
        navy: {
          DEFAULT: '#0A0B0F',
          dark: '#050506',
          light: '#12131A',
        },
        obsidian: {
          DEFAULT: '#0C0D11',
          deep: '#07080A',
          surface: '#111218',
          elevated: '#16171F',
        },
        /* ── Monochrome Text Hierarchy ── */
        primary: { DEFAULT: '#ffffff', hover: '#e4e4e7', active: '#d4d4d8' },
        muted: '#71717A',
        ghost: '#3f3f46',
        /* ── Brand Accent (used sparingly) ── */
        accent: {
          blue: '#2563EB',
          purple: '#8B5CF6',
          emerald: '#10B981',
        },
        /* ── Light Panel (luxury contrast) ── */
        cream: '#f2efe9',
        warm: '#e8e5de',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ['"Space Grotesk"', '-apple-system', 'sans-serif'],
      },
      lineHeight: {
        'ultra-tight': '0.85',
        'super-tight': '0.9',
        'editorial': '0.95',
      },
      letterSpacing: {
        'ultra-tight': '-0.05em',
        'super-tight': '-0.035em',
        tighter: '-0.02em',
        widest: '0.15em',
        'editorial': '0.25em',
      },
      borderRadius: {
        'card': '16px',
        'card-lg': '20px',
      },
      transitionTimingFunction: {
        'cinematic': 'cubic-bezier(0.76, 0, 0.24, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'liquid': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
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
          '0%,100%': { boxShadow: '0 0 20px rgba(255, 255, 255, 0.04)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 255, 255, 0.08)' },
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
