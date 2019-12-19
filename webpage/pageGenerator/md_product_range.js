const query = `
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
}`;

exports.query = query;
