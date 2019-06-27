import React from 'react';
import { graphql } from 'gatsby';
import propTypes from 'prop-types';
import * as R from 'ramda';
import Layout from '../components/layout';
import Wrapper from '../components/wrapper';
import ComingSoon from '../components/ComingSoon';
import SEO from '../components/seo';
import { BulkProducts } from '../components/BulkProducts';

const CategoryRoute = ({ data, pageContext }) => {
  const post = data.cat;
  const { products } = data;
  const removeDiscount = item =>
    item.price - (item.discount && item.discount > 0 ? item.discount : 0);

  const minPricedVarient = R.compose(
    R.head,
    R.sort((a, b) => removeDiscount(a) - removeDiscount(b)),
    R.filter(input => input.price && input.price > 0)
  );
  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        keywords={post.frontmatter.keywords || []}
      />
      <Wrapper>
        <div>
          <h1>{post.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <div className="flex flex-wrap w-full">
            {products ? (
              <BulkProducts
                products={products.edges
                  .map(({ node }) => ({
                    name: node.frontmatter.title,
                    images: R.pathOr('', ['frontmatter', 'images'])(node),
                    slug: `${pageContext.slug}/${node.fields.productName}`,
                    variants: R.pathOr([], ['frontmatter', 'variants'])(node),
                    minPriceCents: R.compose(
                      R.prop('price'),
                      minPricedVarient,
                      R.pathOr([], ['frontmatter', 'variants'])
                    )(node),
                    range: R.pathOr([], ['frontmatter', 'range'])(node),
                  }))
                  .sort((a, b) => a.minPriceCents - b.minPriceCents)
                  .sort((a, b) =>
                    String(a.range).localeCompare(String(b.range))
                  )}
              />
            ) : (
              <ComingSoon />
            )}
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String, $catName: String) {
    cat: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        variants {
          price
          varientName
          discount
        }
        keywords
      }
    }
    allFile(filter: { sourceInstanceName: { eq: "contentImages" } }) {
      edges {
        node {
          relativePath
          absolutePath
          childImageSharp {
            fluid(maxWidth: 200) {
              src
            }
          }
        }
      }
    }
    products: allMarkdownRemark(
      filter: {
        fields: { type: { eq: "product" }, category: { eq: $catName } }
      }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            images
            range
            variants {
              price
              varientName
              discount
            }
          }
          fields {
            productName
          }
        }
      }
    }
  }
`;

CategoryRoute.propTypes = {
  data: propTypes.any,
  pageContext: propTypes.any,
};

export default CategoryRoute;
