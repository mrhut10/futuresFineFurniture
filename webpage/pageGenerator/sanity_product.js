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
        category {
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

