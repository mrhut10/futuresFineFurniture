const query = `
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
}`;

exports.query = query;
