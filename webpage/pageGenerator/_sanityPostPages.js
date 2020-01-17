const path = require('path');
const slugify = require('slugify');

const pageDefinitions = {
  author: {
    query: `
    {
      allSanityPostAuthor {
        nodes{
          _id
          name
        }
      }
    }`,
    generator: actions => ({ data }) => {
      // create a author page for each author
      data.allSanityPostAuthor.nodes.forEach(node => {
        actions.createPage({
          path: `/posts/authors/${slugify(node.name, { lower: true })}`,
          component: path.resolve('./src/templates/postAuthorPage.js'),
          context: { _id: node._id },
        });
      });
    },
  },
};

exports.GeneratePostPages = ({ graphql, actions }) =>
  Object.keys(pageDefinitions).reduce(
    // reduce to object with same keys which values are promise's of pages
    (acc, next) => {
      // map each query to a promisedReturnedData
      const pageDefinition = pageDefinitions[next];
      // map value to prmised data then to a promised pages
      acc[next] = graphql(pageDefinition.query).then(
        pageDefinition.generator(actions)
      );
      return acc;
    },
    // initial blank object
    {}
  );
