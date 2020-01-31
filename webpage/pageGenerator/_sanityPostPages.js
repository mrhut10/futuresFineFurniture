const path = require('path');
const slugify = require('slugify');
const { arrayMinMax } = require('../src/helpers');

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
  blog: {
    query: `
    {
      allSanityPostBlog(filter: {generic: {disable: {ne: true}}}, sort: {order: ASC, fields: generic___dateRelease}) {
        nodes {
          _id
          generic {
            dateReleaseYear : dateRelease(formatString: "YYYY")
            dateReleaseMonth : dateRelease(formatString: "MM")
            dateRelease
            slug {
              current
            }
          }
        }
      }
    }
    `,
    generator: actions => ({ data }) => {
      const dateRange = {};
      [dateRange.dateMin, dateRange.dateMax] = arrayMinMax(
        data.allSanityPostBlog.nodes.map(node => node.generic.dateRelease)
      );

      // create a page for each blog post
      data.allSanityPostBlog.nodes.forEach(node => {
        const {
          dateReleaseYear: year,
          dateReleaseMonth: month,
          slug,
        } = node.generic;
        const route = `/posts/blog/${year}-${month}/${slug.current}`;
        actions.createPage({
          path: route,
          component: path.resolve('./src/templates/postBlogPage.js'),
          context: { _id: node._id, dateRange },
        });
      });
    },
  },
  news: {
    query: `
      {
        allSanityPostNews(filter: {generic: {disable: {ne: true}}}) {
          nodes {
            _id
            generic {
              dateRelease(formatString: "YYYY-MMM-DD")
              slug {
                current
              }
            }
          }
        }
      }
    `,
    generator: actions => ({ data }) => {
      const dateRange = {};
      [dateRange.dateMin, dateRange.dateMax] = arrayMinMax(
        data.allSanityPostNews.nodes.map(node => node.generic.dateRelease)
      );
      data.allSanityPostNews.nodes.forEach(node => {
        const { dateRelease: date, slug } = node.generic;
        const route = `/posts/news/${date}/${slug.current}`;
        actions.createPage({
          path: route,
          component: path.resolve('./src/templates/postNewsPage.js'),
          context: { _id: node._id, dateRange },
        });
      });
    },
  },
};

const GeneratePostPages = ({ graphql, actions }) =>
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

exports.GeneratePostPages = GeneratePostPages;
