/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#1c1410',
        surface: '#261e18',
        surface2: '#2e2420',
        surface3: '#382c26',
        border: '#3d3028',
        accent: '#d4956a',
        accent2: '#e8b48a',
        'accent-dark': '#8a5a38',
        text: '#f0e8de',
        'text-sub': '#a89080',
        'text-muted': '#7a6458',
        green: '#7ab08a',
        'line-green': '#06c755',
        gold: '#d4af37',
      },
      fontFamily: {
        sans: ['Zen Kaku Gothic New', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
        serif: ['Shippori Mincho', 'serif'],
      },
    },
  },
  plugins: [],
}
