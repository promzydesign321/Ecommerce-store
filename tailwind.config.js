/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF7F2',
        beige: '#E8DED0',
        sand: '#D4C4A8',
        gold: '#C9A96E',
        'gold-light': '#EDE0C8',
        charcoal: '#1C1C1C',
        muted: '#8A8A8A',
        'warm-gray': '#F0EDE8',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
