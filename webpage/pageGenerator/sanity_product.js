const query = `{
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
}`;

exports.createPages = ({graphql, actions}) => {
  const querySanityProduct = graphql(query);

}
exports.query = query;

