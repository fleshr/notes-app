/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        header: '0 0 5px rgba(0, 0, 0, 0.15)',
        popup: '0px 2px 12px rgba(0, 0, 0, 0.15)',
      },
      opacity: {
        15: '.15',
      },
      margin: {
        7.5: '1.875rem',
      },
      colors: {
        yellow: {
          100: '#FEF6CB',
          200: '#8C824D',
        },
        green: {
          100: '#CCFFD1',
          200: '#4D8C53',
        },
        blue: {
          100: '#CCE5FF',
          200: '#4D6D8C',
        },
        purple: {
          100: '#F6CCFF',
          200: '#814D8C',
        },
      },
      gridTemplateColumns: {
        notes: 'repeat(auto-fill, minmax(15rem, 1fr))',
      },
      screens: {
        lg: '1060px',
      },
    },
  },
  plugins: [],
};
