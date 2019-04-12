/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');
const slugify = require('slugify');
const R = require('ramda')
const snipcart_JSON = require('./src/snipcartJSON_maker.js')

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
  const query_ProductCategory = graphql(querys.productCategory);
  const query_ProductRange = graphql(querys.productRange);
  const query_product = graphql(querys.product);

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
        path: `/category/${node.frontmatter.Category}/${slugify(
          node.frontmatter.title
        )}`,
        component: path.resolve(`./src/templates/productRoute.js`),
        context: {
          productName: slugify(node.frontmatter.title),
          images: nodeToImageList(node),
        },
      });
    });
  };

  // Do work in promise
  const productCategoriesPages = query_ProductCategory.then(
    queryToCategoryPage
  );
  
  const productRangePages = query_ProductRange.then(queryToRangePage);
  const productPages = query_product.then(queryToProductPages);
  const writesnipcartJSON = new Promise((resolve,reject)=>{
    query_product.then(result=>{
      
      if (process.env.NODE_ENV == "develop") {
        resolve();
      } else {
        const fs = require('fs');
        const snipcart_object = snipcart_JSON.snipcart_json(result);
        const JSONObject =JSON.stringify(snipcart_object);
        if (fs.existsSync('./static/snipcart.json')){
          fs.unlinkSync('./static/snipcart.json')
        }
        if (fs.existsSync('./public/snipcart.json')){
          fs.unlinkSync('./public/snipcart.json')
        }
        fs.writeFile(
          './static/snipcart.json',
          JSONObject,
          er=>er?reject(er):resolve(er)
        );
      }
    });
  })

  return Promise.all([productCategoriesPages, productRangePages, productPages, writesnipcartJSON]);
};

/*
exports.onPostBuild = ({ graphql }) => {
  const query_product = graphql(querys.product);
  const JSONObject = query_product.then(snipcart_JSON)
  const fs = require('fs');
  return fs.writeFileSync('./static/snipcart.json',JSONObject);
};*\

/*
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
    {
      allFile(filter:{sourceInstanceName:{eq:"productCategory"}}) {
        edges {
          node {
            childMarkdownRemark {
              frontmatter {
                title
              }
            }
          }
        }
      }
    }
    `).then(result => {
        result.data.allFile.edges.forEach(({ node }) => {
          createPage({
            path: `range/${node.childMarkdownRemark.frontmatter.title}`,
            component: path.resolve(`./src/templates/mainCatListing.js`),
            context: {
              slug: `range/${node.childMarkdownRemark.frontmatter.title}`,
            }
          })
        })
        resolve()
      })
  })
}
*/
