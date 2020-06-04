const fs = require('fs');
const path = require('path');
const snipcartSanityToJSON = require('../src/helpers/snipcart_sanityToJSON');
const { getAllParentNodes, getAllChildNodes } = require('../src/helpers/index');

const CategoryProductsPerPage = 45;

const pageDefs = ({ graphql, actions }) => ({
  product: {
    generator: result => {
      try {
        const snipcartObject = snipcartSanityToJSON.snipcartJson(result);
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
        actions.reporter.error('error writing snipcart file');
      }
      result.data.allSanityProduct.nodes.forEach(node => {
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
          nodes {
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
              price
              discount_method
              discount_amount
              disable
            }
          }
        }
      }
    `),
  },
  category: {
    generator: ({ data }) => {
      const categoryNodes = data.allSanityCategory.edges.map(
        ({ node }) => node
      );
      const productNodes = data.allSanityProduct.edges.map(({ node }) => node);

      categoryNodes.forEach(node => {
        const getChildConfig = {
          fnGetParentNode: x => (x ? x.categoryParent : null),
          fnGetIdFromNode: x => (x ? x._id : null),
          fnGetDisabledFromNode: x => (x && x.common ? x.common.disable : null),
        };
        const childCategories = getAllChildNodes(
          getChildConfig,
          categoryNodes,
          node
        );
        const childCategoriesIds = childCategories.map(({ _id }) => _id);

        const categoriesToInclude = [node._id, ...childCategoriesIds];
        const categoriesParents = getAllParentNodes(
          getChildConfig,
          categoryNodes,
          node
        ).map(x => x._id);

        if (node.slug && node.slug.current) {
          const route = `/category/${node.slug.current}`.toLowerCase();
          const productsRelivant = productNodes.filter(
            productNode =>
              (productNode.common || {}).disable !== true &&
              (productNode.slug || {}).current &&
              categoriesToInclude.includes(productNode.category._id)
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
              categoriesToInclude,
              categoriesParents,
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
              categoriesToInclude,
              categoriesParents,
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
                categoriesToInclude,
                categoriesParents,
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
              name
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
              common {
                disable
              }
              slug {
                current
              }
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
  // fire off promises to get data
  const pageData = pageDefs({ graphql, actions });
  return Object.keys(pageData).reduce((acc, next) => {
    const { query, generator } = pageData[next];
    acc[next] = query.then(generator);
    return acc;
  }, {});
};
