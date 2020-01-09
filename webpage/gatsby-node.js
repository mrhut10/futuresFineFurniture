/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// Load variables from `.env` as soon as possible
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

const fs = require('fs');
const path = require('path');
const snipcart_sanityToJSON = require('./src/helpers/snipcart_sanityToJSON.js');
const query_sanityCategory = require('./pageGenerator/sanity_product_category')
  .query;
const query_sanityProduct = require('./pageGenerator/sanity_product').query;

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  // run query
  const querySanityCategory = graphql(query_sanityCategory);
  const querySanityProduct = graphql(query_sanityProduct);
  // page generator functions
  const querySanityCategoryPage = result => {
    result.data.allSanityCategory.edges.forEach(({ node }) => {
      if (node.slug && node.slug.current) {
        const route = `/category/${node.slug.current}`.toLowerCase();
        createPage({
          path: route,
          component: path.resolve('./src/templates/category-sanity.js'),
          context: {
            catigoryID: node._id,
            pageNum: 1,
            productsPerPage: 60,
          },
        });
      } else {
        console.error('no slug for Category Page', node);
      }
    });
  };
  const querySanityProductPage = result => {
    result.data.allSanityProduct.edges.forEach(({ node }) => {
      if (node.slug && node.slug.current) {
        // product has slug
        if (node.category && node.category.slug && node.category.slug.current) {
          // has a valid category with a slug
          createPage({
            path: `/category/${node.category.slug.current}/${node.slug.current}`.toLowerCase(),
            component: path.resolve('./src/templates/product-sanity.js'),
            context: {
              productID: node._id,
              categoryID: node.category._id,
              rangeIDs: node.range.map(i => i._id),
            },
          });
        }
      }
    });
  };

  /* 
  const queryToCategoryPage = result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/category-route.js`),
        context: {
          slug: node.fields.slug,
          catName: node.frontmatter.title,
          images: node.frontmatter.images,
          disabled: node.fields.disabled,
        },
      });
    });
  };
  */
  /*
  
  const queryToRangePage = result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/range-route.js`),
        context: {
          slug: node.fields.slug,
        },
      });
    });
  };
  */

  /*
  const queryToProductPages = result => {
    const nodeToImageList = R.compose(
      R.lift(
        R.compose(
          R.last,
          R.split('/')
        )
      ),
      R.pathOr([], ['frontmatter', 'images'])
    );

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      // create main page from category
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/product-route.js`),
        context: {
          productName: slugify(node.frontmatter.title),
          range: node.frontmatter.range,
          images: nodeToImageList(node),
        },
      });
    });
  };
*/
  // Do work in promise
  // // querySanityCategoryPage querySanityCategory
  const sanityProductPage = querySanityProduct.then(querySanityProductPage);
  const sanityCategoryPage = querySanityCategory.then(querySanityCategoryPage);
  // const productCategoriesPages = queryProductCategory.then(queryToCategoryPage);
  // const productRangePages = queryProductRange.then(queryToRangePage);

  // product and category pages
  // const productPages = queryProduct.then(queryToProductPages);
  const ProductPages = Promise.all([
    querySanityProduct,
    querySanityCategory,
  ]).then(values => {
    const [ProductsResults, CategoryResults] = values;
    CategoryResults.data.allSanityCategory.edges.forEach(({ node }) => {
      if (node.slug && node.slug.current) {
        const route = `/category/${node.slug.current}`;
        const productsPerPage = 45;
        const productsRelivant = ProductsResults.data.allSanityProduct.edges.filter(
          product => product.node.category._id === node._id
        );
        const numberOfPages = Math.ceil(
          productsRelivant.length / productsPerPage
        );
        // create default page
        createPage({
          path: route.toLowerCase(),
          component: path.resolve('./src/templates/category-sanity.js'),
          context: {
            categoryID: node._id,
            productsPerPage,
            pageNum: 1,
            skip: 0,
            totalPages: numberOfPages,
            totalProducts: productsRelivant.length,
          },
        });
        // create extra pages
        Array.from({ length: numberOfPages }).forEach((_, i) => {
          createPage({
            path: `${route.toLowerCase()}/page-${i + 1}`,
            component: path.resolve('./src/templates/category-sanity.js'),
            context: {
              categoryID: node._id,
              productsPerPage,
              pageNum: i + 1,
              skip: productsPerPage * i,
              totalPages: numberOfPages,
              totalProducts: productsRelivant.length,
            },
          });
        });
      }
    });
  });
  const writesnipcart_sanitytoJSON = new Promise((resolve, reject) => {
    querySanityProduct.then(result => {
      const snipcartObject = snipcart_sanityToJSON.snipcartJson(result);
      const JSONObject = JSON.stringify(snipcartObject);
      if (process.env.NODE_ENV === 'development') {
        console.log('snipcart.json not created in development');
        resolve();
      } else {
        fs.writeFile('./static/snipcart.json', JSONObject, er =>
          er ? reject(er) : resolve()
        );
      }
    });
  });

  const allPromisses = [
    // productCategoriesPages,
    // productRangePages,
    // productPages,
    ProductPages,
    // writesnipcart_MDtoJSON,
    sanityCategoryPage,
    sanityProductPage,
    writesnipcart_sanitytoJSON,
  ];
  return Promise.all(allPromisses);
};
