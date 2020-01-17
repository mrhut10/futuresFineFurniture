/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// Load variables from `.env` as soon as possible

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

const { GenerateProductPages } = require('./pageGenerator/_sanityProductPages');
const { GeneratePostPages } = require('./pageGenerator/_sanityPostPages');

exports.createPages = ({ graphql, actions }) => {
  // generate product related Pages
  const promisedProductPages = GenerateProductPages({ graphql, actions });
  // generate post related Pages
  const promisedPostPages = GeneratePostPages({ graphql, actions });

  const allPromisses = [
    // all the product related pages
    ...Object.keys(promisedProductPages).map(key => promisedProductPages[key]),
    // all the Post pages
    ...Object.keys(promisedPostPages).map(key => promisedPostPages[key]),
  ];
  return Promise.all(allPromisses);
};
