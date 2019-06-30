import React from 'react';
import * as R from 'ramda';
import { StaticQuery, graphql, Link } from 'gatsby';
import slugify from 'slugify';
import Layout from '../components/layout';
import { BulkProducts } from '../components/BulkProducts';
import Wrapper from '../components/wrapper';

const query = graphql`
  {
    allMarkdownRemark(filter: { fields: { type: { eq: "product" } } }) {
      edges {
        node {
          fields {
            slug
            range
            category
          }
          frontmatter {
            title
            images
            enabled
            Category
            range
            variants {
              variantName
              price
              discount
            }
          }
        }
      }
    }
  }
`;

const ProductsByRange = R.groupBy(R.prop('range'));

const queryToProducts = R.compose(
  R.map(
    R.compose(
      node => {
        const output = {
          name: R.path(['frontmatter', 'title'])(node),
          images: R.path(['frontmatter', 'images'])(node),
          slug: R.path(['fields', 'slug'])(node),
          variants: R.path(['frontmatter', 'variants'])(node),
          range: R.path(['fields', 'range'])(node),
          category: R.path(['fields', 'category'])(node),
        };
        return output;
      },
      R.prop('node')
    )
  ),
  R.path(['allMarkdownRemark', 'edges'])
);

const CollectionPage = () => (
  <Layout>
    <Wrapper>
      <div className="pt-8">
        <div className="px-4">
          <h1>Explore Our Collections</h1>
          <StaticQuery
            query={query}
            render={R.compose(
              R.converge(
                (keys, obj) => (
                  <ul>
                    {keys
                      .sort((ka, kb) => obj[kb].length - obj[ka].length)
                      .map(key => (
                        <BulkProducts
                          key={key}
                          products={obj[key]}
                          maxLimit={3}
                          heading={`${key} ${obj[key].length} items`}
                        />
                      ))}
                  </ul>
                ),
                [R.keys, R.map(range => range)]
              ),
              ProductsByRange,
              queryToProducts
            )}
          />
        </div>
      </div>
    </Wrapper>
  </Layout>
);

export default CollectionPage;
