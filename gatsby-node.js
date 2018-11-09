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
      actions.createNodeField({ node, name: 'type', value: `productCats` })
      actions.createNodeField({ node, name: 'slug', value: `/range/${slugify(node.frontmatter.title)}` })
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

}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const productCategories = graphql(querys.productCategory).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/mainCatListing.js`),
        context: {
          slug: node.fields.slug,
        }
      })
    })
  })

  return Promise.all([productCategories])

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