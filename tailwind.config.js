/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#070707', // Luxurious deep black body background
        beige: '#1C1C1C', // Dark divider and border line gray
        sand: '#AA8E59', // Beautiful metallic sand gold
        gold: '#D4AF37', // Pure metallic gold accent
        'gold-light': '#EAE0C8', // Soft cream/gold highlight
        charcoal: '#F3F4F6', // Readable off-white text color
        muted: '#9CA3AF', // Muted secondary text gray
        'warm-gray': '#121212', // Slightly lighter dark background for panels/cards
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
