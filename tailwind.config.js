/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#281c14',
        surface: '#342820',
        surface2: '#3c2e26',
        surface3: '#48382e',
        border: '#524038',
        accent: '#e8a878',
        accent2: '#f5c89c',
        'accent-dark': '#a06a44',
        text: '#f5ede4',
        'text-sub': '#c0a898',
        'text-muted': '#94786c',
        green: '#8cc09a',
        'line-green': '#06c755',
        gold: '#e0c040',
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
