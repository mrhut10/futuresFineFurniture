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
const slugify = require('slugify');
const R = require('ramda');
const snipcart_MDtoJSON = require('./src/helpers/snipcart_MDtoJSON_file');
const snipcart_sanityToJSON = require('./src/helpers/snipcart_sanityToJSON.js');
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
  sanityCategory: `
  {
    allSanityCategory{
      edges{node{
        _id
        slug{current}
      }}
    }
  }
  `,
  sanityProduct: `
  {
    allSanityProduct {
      edges {
        node {
          _id
          name
          slug {
            current
          }
          category {
            slug {
              current
            }
          }
          variants {
            name
            disable
            price
            discount_amount
            discount_method
          }
        }
      }
    }
  }`,
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
  const { createPage, createRedirect } = actions;

  // run query
  const querySanityCategory = graphql(queries.sanityCategory);
  const querySanityProduct = graphql(queries.sanityProduct);
  const queryProductCategory = graphql(queries.productCategory);
  const queryProductRange = graphql(queries.productRange);
  const queryProduct = graphql(queries.product);

  // page generator functions
  const querySanityCategoryPage = result => {
    result.data.allSanityCategory.edges.forEach(({ node }) => {
      if (node.slug && node.slug.current) {
        const route = `/sanity/category/${node.slug.current}`;
        createPage({
          path: route.toLowerCase(),
          component: path.resolve('./src/templates/category-sanity.js'),
          context: {
            catigoryID: node._id,
            pageNum: 1,
            productsPerPage: 30,
          },
        });
        createRedirect({
          fromPath: route,
          isPermanent: true,
          toPath: route.toLowerCase(),
          force: true,
          redirectInBrowser: true,
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
          const routes = [
            `/sanity/category/${node.category.slug.current}/${node.slug.current}`,
          ];
          if (routes[0] !== routes[0].toLowerCase()) {
            routes.push(routes[0].toLowerCase());
          }
          routes.forEach(route => {
            createPage({
              path: route,
              component: path.resolve('./src/templates/product-sanity.js'),
              context: {
                productID: node._id,
              },
            });
          });
        }
      }
    });
  };
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
  // // querySanityCategoryPage querySanityCategory
  const sanityCategoryPage = querySanityCategory.then(querySanityCategoryPage);
  const sanityProductPage = querySanityProduct.then(querySanityProductPage);
  const productCategoriesPages = queryProductCategory.then(queryToCategoryPage);
  const productRangePages = queryProductRange.then(queryToRangePage);
  const productPages = queryProduct.then(queryToProductPages);
  const writeSanityDumpFile = dumpMdsToSanityFile
    ? new Promise((resolve, reject) => {
        queryProduct.then(result => {
          const { productArrayToSanityDump } = dumpMdsToSanityFile;
          const products = result.data.allMarkdownRemark.edges.map(
            ({ node }) => ({
              name: node.frontmatter.title,
              slug: node.fields.slug,
              category: node.frontmatter.Category,
              range: node.frontmatter.range,
              variants: node.frontmatter.variants.map(variant => ({
                variantName: variant.variantName,
                price: variant.price,
                disabled: variant.disabled,
              })),
              disabled: node.frontmatter.disabled,
            })
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
  const writesnipcart_sanitytoJSON = new Promise((resolve, reject) => {
    querySanityProduct.then(result => {
      const snipcartObject = snipcart_sanityToJSON.snipcartJson(result);
      const JSONObject = JSON.stringify(snipcartObject);
      if (process.env.NODE_ENV === 'development') {
        console.log('snipcart.json not created in development');
        resolve();
      } else {
        fs.writeFile('./static/snipcart.json', JSONObject, er =>
          er ? reject(er) : resolve(er)
        );
      }
    });
  });
  const writesnipcart_MDtoJSON = new Promise((resolve, reject) => {
    queryProduct.then(result => {
      const snipcartObject = snipcart_MDtoJSON.snipcartJson(result);
      const JSONObject = JSON.stringify(snipcartObject);
      if (process.env.NODE_ENV === 'development') {
        console.log('snipcart_MD.json not created as in development');
        resolve();
      } else {
        fs.writeFile('./static/snipcart_md.json', JSONObject, er =>
          er ? reject(er) : resolve(er)
        );
      }
    });
  });

  const allPromisses = [
    productCategoriesPages,
    productRangePages,
    productPages,
    writesnipcart_MDtoJSON,
    sanityCategoryPage,
    sanityProductPage,
  ];
  if (writeSanityDumpFile) {
    allPromisses.push(writeSanityDumpFile);
  }
  return Promise.all(allPromisses);
};
