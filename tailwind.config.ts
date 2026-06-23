import type { Config } from 'tailwindcss';

// Semantic colors map to CSS variables defined in src/index.css.
// The `.light` class on <html> swaps the variable set → both themes
// are fully styled; default (no class) is the cinematic dark theme.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: 'var(--c-canvas)',
        panel: 'var(--c-panel)',
        'panel-2': 'var(--c-panel-2)',
        edge: 'var(--c-edge)',
        ink: 'var(--c-ink)',
        mute: 'var(--c-mute)',
        faint: 'var(--c-faint)',
        accent: 'var(--c-accent)',
        'accent-soft': 'var(--c-accent-soft)',
        positive: 'var(--c-positive)',
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        micro: '0.18em',
      },
      maxWidth: {
        site: '72rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-dot': {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
        'glow-pan': {
          '0%,100%': { transform: 'translate3d(-10%, -10%, 0) scale(1)' },
          '50%': { transform: 'translate3d(10%, 8%, 0) scale(1.15)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.16,1,0.3,1) both',
        'pulse-dot': 'pulse-dot 2.4s ease-in-out infinite',
        'glow-pan': 'glow-pan 18s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
