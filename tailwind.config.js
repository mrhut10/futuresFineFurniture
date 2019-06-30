module.exports = {
  theme: {
    extend: {
      colors: {
        gray: {
          100: '#FAF9F7',
          200: '#E0DCD6',
          300: '#C5C1B7',
          400: '#ABA599',
          500: '#908A7D',
          600: '#767063',
          700: '#5C564A',
          800: '#413D33',
          900: '#27241D',
        },
        maroon: {
          100: '#FFEAE7',
          200: '#E5C1BC',
          300: '#CC9C96',
          400: '#B27B73',
          500: '#985D56',
          600: '#7E443C',
          700: '#652F28',
          800: '#4B1D17',
          900: '#33100B',
        },
        cream: {
          100: '#FEFAE0',
          200: '#FFF8C4',
          300: '#F2E5A1',
          400: '#D3C174',
          500: '#B39F4F',
          600: '#937E31',
          700: '#735F1A',
          800: '#53420A',
          900: '#3B2C00',
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
