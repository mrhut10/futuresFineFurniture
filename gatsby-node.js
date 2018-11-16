/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path')
const slugify = require('slugify')

exports.onCreateNode = ({ node, actions }) => {
  if (node.internal.type === "MarkdownRemark") {
    if (node.fileAbsolutePath.includes('/collections/productCats/')) {
      // if a productCatigory
      actions.createNodeField({ node, name: 'type', value: `productCats` })
      actions.createNodeField({ node, name: 'slug', value: `/category/${slugify(node.frontmatter.title)}` })
      actions.createNodeField({ node, name: 'catName', value: node.frontmatter.title })

    } else if (node.fileAbsolutePath.includes('collections/productRange')) {
      // if a productRange
      actions.createNodeField({ node, name: 'type', value: `productRange` })
      actions.createNodeField({ node, name: 'slug', value: `/collections/${slugify(node.frontmatter.title)}` })
    } else if (node.fileAbsolutePath.includes('collections/product/')) {
      // if a product
      actions.createNodeField({ node, name: 'type', value: `product` })
      actions.createNodeField({ node, name: 'productName', value: `${slugify(node.frontmatter.title)}` })
      actions.createNodeField({ node, name: 'catigory', value: node.frontmatter.Category })
    }
  }
}

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
            variants {
              price
              varientName
            }
          }
        }
      }
    }
  }  
  `
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  //run query
  const query_ProductCategory = graphql(querys.productCategory)
  const query_ProductRange = graphql(querys.productRange)
  const query_product = graphql(querys.product)

  // page generator functions
  const queryToCategoryPage = result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/CatigoryRoute.js`),
        context: {
          slug: node.fields.slug,
          catName: node.frontmatter.title
        }
      })
    })
  }
  const queryToRangePage = result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/RangeRoute.js`),
        context: {
          slug: node.fields.slug
        }
      })
    })
  }
  const queryToProductPages = result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      //create main page from category
      console.log(node);
      createPage({
        path: `/category/${node.frontmatter.Category}/${node.frontmatter.title}`,
        component: path.resolve(`./src/templates/productRoute.js`),
        context: {
          //slug: `/category/${node.frontmatter.Category}/${node.frontmatter.title}`,
          productName: slugify(node.frontmatter.title)
        }
      })
    })
  }



  //Do work in promise
  const productCategoriesPages = query_ProductCategory.then(queryToCategoryPage)
  const productRangePages = query_ProductRange.then(queryToRangePage)
  const productPages = query_product.then(queryToProductPages)

  return Promise.all([productCategoriesPages, productRangePages, productPages])

}

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