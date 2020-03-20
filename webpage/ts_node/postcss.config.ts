import autoprefixer from 'autoprefixer';

const tailwindcss: any = require('tailwindcss');
const postcssImport: any = require('postcss-import');

module.exports = {
  plugins: [postcssImport, tailwindcss, autoprefixer],
};
