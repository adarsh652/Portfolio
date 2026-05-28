/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#000000',
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #134836 0%, #134836 50%, #184637 100%)',
      },
    },
  },
  plugins: [],
}
