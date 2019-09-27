/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// Load variables from `.env` as soon as possible
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});

const fs = require('fs');
const path = require('path');
const slugify = require('slugify');
const R = require('ramda');
const snipcartJSON = require('./src/snipcartJSON_maker.js');
const dumpMdsToSanityFile =
  process.env.DUMP_MDToSanity === 'TRUE'
    ? require('./src/helpers/dumpmdtoSanityFile')
    : null;

exports.onCreateNode = ({ node, actions }) => {
  if (node.internal.type === 'MarkdownRemark') {
    if (node.fileAbsolutePath.includes('/collections/productCats/')) {
      // if a productCategory
      actions.createNodeField({ node, name: 'type', value: `productCats` });
      actions.createNodeField({
        node,
        name: 'slug',
        value: `/category/${slugify(node.frontmatter.title)}`,
      });
      actions.createNodeField({
        node,
        name: 'catName',
        value: node.frontmatter.title,
      });
      actions.createNodeField({
        node,
        name: 'disabled',
        value: node.frontmatter.disabled,
      });
    } else if (node.fileAbsolutePath.includes('collections/productRange')) {
      // if a productRange
      actions.createNodeField({ node, name: 'type', value: `productRange` });
      actions.createNodeField({
        node,
        name: 'slug',
        value: `/collections/${slugify(node.frontmatter.title)}`,
      });
    } else if (node.fileAbsolutePath.includes('collections/product/')) {
      // if a product
      if (node.frontmatter.Category === 'Lounges and Sofas') {
        // redirect to ensure havnen't broken old links when we took lounges out of living catigory
        actions.createRedirect({
          fromPath: `/category/Living/${slugify(node.frontmatter.title)}`,
          isPermanent: true,
          toPath: `/category/${slugify(node.frontmatter.Category)}/${slugify(
            node.frontmatter.title
          )}`,
          force: true,
          redirectInBrowser: true,
        });
      }
      actions.createNodeField({
        node,
        name: 'slug',
        value: `/category/${slugify(node.frontmatter.Category)}/${slugify(
          node.frontmatter.title
        )}`,
      });
      actions.createNodeField({ node, name: 'type', value: `product` });
      actions.createNodeField({
        node,
        name: 'productName',
        value: `${slugify(node.frontmatter.title)}`,
      });
      actions.createNodeField({
        node,
        name: 'category',
        value: node.frontmatter.Category,
      });
      actions.createNodeField({
        node,
        name: 'range',
        value: node.frontmatter.range,
      });
      actions.createNodeField({
        node,
        name: 'disabled',
        value: node.frontmatter.disabled,
      });
    }
  } else if (node.internal.type === 'gatsby-source-filesystem') {
    if (node.fileAbsolutePath.includes('/images/uploads')) {
      // do something here
    }
  }
};

const queries = {
  productCategory: `
  {
    allMarkdownRemark(filter: {fields: {type: {eq: "productCats"}}}) {
      edges {
        node {
          fields {
            slug
            type
          }
          frontmatter{
            title
          }
        }
      }
    }
  }`,
  productRange: `
  {
    allMarkdownRemark(filter: {fields: {type: {eq: "productRange"}}}) {
      edges {
        node {
          fields {
            slug
            type
          }
          frontmatter {
            title
            range
          }
        }
      }
    }
  }
  `,
  product: `
  {
    allMarkdownRemark(filter: {fields: {type: {eq: "product"}}}) {
      edges {
        node {
          fields {
            slug
            disabled
          }
          frontmatter {
            title
            Category
            range
            images
            disabled
            variants {
              price
              variantName
              discount
              disabled
            }
          }
        }
      }
    }
  }
  `,
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  // run query
  const queryProductCategory = graphql(queries.productCategory);
  const queryProductRange = graphql(queries.productRange);
  const queryProduct = graphql(queries.product);

  // page generator functions
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

  // Do work in promise
  const productCategoriesPages = queryProductCategory.then(queryToCategoryPage);

  const productRangePages = queryProductRange.then(queryToRangePage);
  const productPages = queryProduct.then(queryToProductPages);
  const writeSanityDumpFile = dumpMdsToSanityFile
    ? new Promise((resolve, reject) => {
        queryProduct.then(result => {
          const { productArrayToSanityDump } = dumpMdsToSanityFile;
          const products = result.data.allMarkdownRemark.edges.map(({ node }) => {
              return {
                name: node.frontmatter.title,
                slug: node.fields.slug,
                category: node.frontmatter.Category,
                range: node.frontmatter.range,
                variants: node.frontmatter.variants.map(variant => {
                  return {
                    variantName: variant.variantName,
                    price: variant.price,
                    disabled: variant.disabled,
                  };
                }),
                disabled: node.frontmatter.disabled,
              };
            }
          );
          if (process.env.NODE_ENV === 'development') {
            fs.writeFile(
              './../dumpFile.txt',
              productArrayToSanityDump(products),
              er => (er ? reject(er) : resolve(er))
            );
          } else {
            resolve();
          }
        });
      })
    : null;
  const writesnipcartJSON = new Promise((resolve, reject) => {
    queryProduct.then(result => {
      const snipcartObject = snipcartJSON.snipcartJson(result);
      const JSONObject = JSON.stringify(snipcartObject);
      if (process.env.NODE_ENV === 'development') {
        console.log('snipcart.json not created as in development');
        resolve();
      } else {
        fs.writeFile('./static/snipcart.json', JSONObject, er =>
          er ? reject(er) : resolve(er)
        );
      }
    });
  });

  const allPromisses = [
    productCategoriesPages,
    productRangePages,
    productPages,
    writesnipcartJSON,
  ];
  if (writeSanityDumpFile){
    allPromisses.push(writeSanityDumpFile);
  }
  return Promise.all(allPromisses);
};
