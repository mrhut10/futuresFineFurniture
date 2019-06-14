/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const fs = require('fs');
const path = require('path');
const slugify = require('slugify');
const R = require('ramda');
const snipcartJSON = require('./src/snipcartJSON_maker.js');

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
      actions.createNodeField({
        node,
        name: 'slug',
        value: `/category/${node.frontmatter.Category}/${slugify(
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
    }
  } else if (node.internal.type === 'gatsby-source-filesystem') {
    if (node.fileAbsolutePath.includes('/images/uploads')) {
      // do something here
    }
  }
};

const querys = {
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
          }
          frontmatter {
            title
            Category
            range
            images
            variants {
              price
              varientName
              discount
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
  const queryProductCategory = graphql(querys.productCategory);
  const queryProductRange = graphql(querys.productRange);
  const queryProduct = graphql(querys.product);

  // page generator functions
  const queryToCategoryPage = result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/CategoryRoute.js`),
        context: {
          slug: node.fields.slug,
          catName: node.frontmatter.title,
          images: node.frontmatter.images,
        },
      });
    });
  };
  const queryToRangePage = result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/RangeRoute.js`),
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
        component: path.resolve(`./src/templates/productRoute.js`),
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
  const writesnipcartJSON = new Promise((resolve, reject) => {
    queryProduct.then(result => {
      if (process.env.NODE_ENV === 'develop') {
        resolve();
      } else {
        const snipcartObject = snipcartJSON.snipcartJson(result);
        const JSONObject = JSON.stringify(snipcartObject);
        if (fs.existsSync('./static/snipcart.json')) {
          fs.unlinkSync('./static/snipcart.json');
        }
        /* if (fs.existsSync('./public/snipcart.json')) {
          fs.unlinkSync('./public/snipcart.json');
        } */
        fs.writeFile('./static/snipcart.json', JSONObject, er =>
          er ? reject(er) : resolve(er)
        );
      }
    });
  });

  return Promise.all([
    productCategoriesPages,
    productRangePages,
    productPages,
    writesnipcartJSON,
  ]);
};
