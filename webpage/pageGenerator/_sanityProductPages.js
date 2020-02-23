const fs = require('fs');
const path = require('path');
const snipcart_sanityToJSON = require('../src/helpers/snipcart_sanityToJSON');
const { getAllParentNodes, getAllChildNodes } = require('../src/helpers/index');

const CategoryProductsPerPage = 45;

const pagedefs = ({ graphql, actions }) => ({
  product: {
    generator: result => {
      try {
        const snipcartObject = snipcart_sanityToJSON.snipcartJson(result);
        const JSONObject = JSON.stringify(snipcartObject);
        const exists = [
          fs.existsSync('./public/snipcart.json'),
          fs.existsSync('./static/snipcart.json'),
        ];
        exists.forEach((value, index) => {
          if (value)
            fs.unlinkSync(
              index === 0 ? './public/snipcart.json' : './static/snipcart.json'
            );
        });
        fs.writeFileSync('./static/snipcart.json', JSONObject);
      } catch (error) {
        console.log('error writing snipcart file', error);
      }
      result.data.allSanityProduct.edges.forEach(({ node }) => {
        if (node.slug && node.slug.current) {
          // product has slug
          if (
            node.category &&
            node.category.slug &&
            node.category.slug.current
          ) {
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
    query: graphql(`
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
            }
          }
        }
      }
    `),
  },
  category: {
    generator: ({ data }) => {
      data.allSanityCategory.edges.forEach(({ node }, _, _allCategories) => {
        const allCategoriesNodes = _allCategories.map(
          ({ node: mapCat }) => mapCat
        );
        const getChildConfig = {
          fnGetParentNode: x => (x ? x.categoryParent : null),
          fnGetIdFromNode: x => (x ? x._id : null),
          fnGetDisabledFromNode: x => (x && x.common ? x.common.disable : null),
        };
        const childCategories = getAllChildNodes(
          getChildConfig,
          allCategoriesNodes,
          node
        );
        const childCategoriesIds = childCategories
          ? childCategories.map(childNode =>
              getChildConfig.fnGetIdFromNode(childNode)
            )
          : [];
        if (node.slug && node.slug.current) {
          const route = `/category/${node.slug.current}`.toLowerCase();
          const productsRelivant = data.allSanityProduct.edges.filter(
            product =>
              product.node.common.disable !== true &&
              product.node.slug.current &&
              (product.node.category._id === node._id ||
                childCategoriesIds.includes(product.node.category._id))
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
              categoriesToInclude: [node._id, ...childCategoriesIds],
            },
          });
          // create all page
          actions.createPage({
            path: `${route}/all`,
            component: path.resolve('./src/templates/category-sanity.js'),
            context: {
              categoryID: node._id,
              productsPerPage: 10000,
              pageNum: 1,
              skip: 0,
              totalPages: 1,
              totalProducts: productsRelivant.length,
              categoriesToInclude: [node._id, ...childCategoriesIds],
            },
          });
          // create extra pages
          Array.from({ length: numberOfPages }).forEach((_, i) => {
            actions.createPage({
              path: `${route}/page-${i + 1}`,
              component: path.resolve('./src/templates/category-sanity.js'),
              context: {
                categoryID: node._id,
                productsPerPage: CategoryProductsPerPage,
                pageNum: i + 1,
                skip: CategoryProductsPerPage * i,
                totalPages: numberOfPages,
                totalProducts: productsRelivant.length,
                categoriesToInclude: [node._id, ...childCategoriesIds],
              },
            });
          });
        } else {
          console.error('no slug for Category Page', node);
        }
      });
    },
    query: graphql(`
      {
        allSanityCategory {
          edges {
            node {
              _id
              categoryParent {
                _id
              }
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
      }
    `),
  },
});

exports.GenerateProductPages = ({ graphql, actions }) => {
  // fire off promases to get data
  const pageData = pagedefs({ graphql, actions });
  return Object.keys(pageData).reduce((acc, next) => {
    const { query, generator } = pageData[next];
    acc[next] = query.then(generator);
    return acc;
  }, {});
};
