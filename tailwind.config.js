/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'navy': {
          50: '#e6e9f0',
          100: '#b3bdd1',
          200: '#8091b2',
          300: '#4d6593',
          400: '#1a3974',
          500: '#001f5c', // Azul marinho principal
          600: '#00194a',
          700: '#001338',
          800: '#000d26',
          900: '#000714',
        },
        'yellow': {
          50: '#fffef0',
          100: '#fff9cc',
          200: '#fff4a8',
          300: '#ffef84',
          400: '#ffea60',
          500: '#ffe53d', // Amarelo principal
          600: '#ccb731',
          700: '#998925',
          800: '#665b18',
          900: '#332d0c',
        },
      },
    },
  },
  plugins: [],
}


