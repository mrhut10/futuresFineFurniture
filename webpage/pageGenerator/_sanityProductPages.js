const fs = require('fs');
const path = require('path');
const snipcart_sanityToJSON = require('../src/helpers/snipcart_sanityToJSON');

const CategoryProductsPerPage = 45;

const queries = {
  product: `
  {
    allSanityProduct {
      edges {
        node {
          _id
          name
          slug {
            current
          }
          common {
            disable
          }
          range {
            _id
          }
          category {
            _id
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
  category: `
  {
    allSanityCategory{
      edges{
        node{
          _id
          slug {
            current
          }
        }
      }
    }
    allSanityProduct {
      edges {
        node {
          _id
          category {
            _id
          }
        }
      }
    }
  }`,
};

const PageGenerators = {
  product: actions => result => {
    try {
      const snipcartObject = snipcart_sanityToJSON.snipcartJson(result);
      const JSONObject = JSON.stringify(snipcartObject);
      fs.writeFile('./static/snipcart.json', JSONObject, er => {
        if (er) {
          throw er;
        }
      });
    } catch (error) {
      console.log('error writing snipcart file', error);
    }

    result.data.allSanityProduct.edges.forEach(({ node }) => {
      if (node.slug && node.slug.current) {
        // product has slug
        if (node.category && node.category.slug && node.category.slug.current) {
          // has a valid category with a slug
          actions.createPage({
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
  },
  category: actions => ({ data }) => {
    data.allSanityCategory.edges.forEach(({ node }) => {
      if (node.slug && node.slug.current) {
        const route = `/category/${node.slug.current}`.toLowerCase();
        const productsRelivant = data.allSanityProduct.edges.filter(
          product =>
            product.node.category._id === node._id &&
            (node.common || {}).disable !== true
        );
        const numberOfPages = Math.ceil(
          productsRelivant.length / CategoryProductsPerPage
        );
        // create default page
        actions.createPage({
          path: route,
          component: path.resolve('./src/templates/category-sanity.js'),
          context: {
            categoryID: node._id,
            productsPerPage: CategoryProductsPerPage,
            pageNum: 1,
            skip: 0,
            totalPages: numberOfPages,
            totalProducts: productsRelivant.length,
          },
        });
        // create extra pages
        Array.from({ length: numberOfPages }).forEach((_, i) => {
          actions.createPage({
            path: `${route.toLowerCase()}/page-${i + 1}`,
            component: path.resolve('./src/templates/category-sanity.js'),
            context: {
              categoryID: node._id,
              productsPerPage: CategoryProductsPerPage,
              pageNum: i + 1,
              skip: CategoryProductsPerPage * i,
              totalPages: numberOfPages,
              totalProducts: productsRelivant.length,
            },
          });
        });
      } else {
        console.error('no slug for Category Page', node);
      }
    });
  },
};

exports.GenerateProductPages = ({ graphql, actions }) => {
  // fire off promases to get data
  const PromisedData = Object.keys(queries).reduce((acc, next) => {
    // map each query to a promisedReturnedData
    acc[next] = graphql(queries[next]);
    return acc;
  }, {});

  // attach a .then to each of the above promises to generate page data
  const PromisedPages = Object.keys(PromisedData).reduce((acc, next) => {
    // map each promisedData to promisedPages
    acc[next] = PromisedData[next].then(PageGenerators[next](actions));
    return acc;
  }, {});
  return PromisedPages;
};
