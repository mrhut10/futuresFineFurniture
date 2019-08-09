const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');
const postcssImport = require('postcss-import');

module.exports = {
  plugins: [postcssImport, tailwindcss, autoprefixer],
};
