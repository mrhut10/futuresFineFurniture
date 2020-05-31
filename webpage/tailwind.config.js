module.exports = {
  theme: {
    extend: {
      colors: {
        gray: {
          100: '#faf9f7',
          200: '#e0dcd6',
          300: '#c5c1b7',
          400: '#aba599',
          500: '#908a7d',
          600: '#767063',
          700: '#5c564a',
          800: '#413d33',
          900: '#27241d',
        },
        maroon: {
          100: '#ffeae7',
          200: '#e5c1bc',
          300: '#cc9c96',
          400: '#b27b73',
          500: '#985d56',
          600: '#7e443c',
          700: '#652f28',
          800: '#4b1d17',
          900: '#33100b',
        },
        cream: {
          100: '#fefae0',
          200: '#fff8c4',
          300: '#f2e5a1',
          400: '#d3c174',
          500: '#b39f4f',
          600: '#937e31',
          700: '#735f1a',
          800: '#53420a',
          900: '#3b2c00',
        },
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'group-hover', 'focus'],
    textColor: ['responsive', 'hover', 'group-hover', 'focus'],
  },
  plugins: [],
};
