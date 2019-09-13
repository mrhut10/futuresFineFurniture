/* eslint-disable react/no-danger */
import React from 'react';
import { graphql } from 'gatsby';
import propTypes from 'prop-types';
import * as R from 'ramda';
import Layout from '../components/Layout';
import Wrapper from '../components/Wrapper';
import NotAvaliable from '../components/NotAvaliable';
import SEO from '../components/SEO';
import { BulkProducts } from '../components/BulkProducts';

const categoryRoute = ({ data, pageContext }) => {
  const { disabled } = pageContext;
  const { products } = data;
  const post = data.cat;
  const removeDiscount = item =>
    item.price - (item.discount && item.discount > 0 ? item.discount : 0);

  const minPricedVariant = R.compose(
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
        <h1 className="font-bold mb-4 text-2xl text-maroon-600">
          {post.frontmatter.title}
        </h1>
        {products && !disabled ? (
          <BulkProducts
            products={products.edges
              .map(({ node }) => ({
                name: node.frontmatter.title,
                images: R.pathOr('', ['frontmatter', 'images'])(node),
                slug: `${pageContext.slug}/${node.fields.productName}`,
                variants: R.pathOr([], ['frontmatter', 'variants'])(node),
                minPriceCents: R.compose(
                  R.prop('price'),
                  minPricedVariant,
                  R.pathOr([], ['frontmatter', 'variants'])
                )(node),
                range: R.pathOr([], ['frontmatter', 'range'])(node),
                disabled: R.pathOr(false, ['frontmatter', 'disabled'])(node),
              }))
              .filter(product => product.disabled !== true)
              .sort((a, b) => a.minPriceCents - b.minPriceCents)
              .sort((a, b) => String(a.range).localeCompare(String(b.range)))}
          />
        ) : (
          <NotAvaliable
            text={disabled ? 'Not Avaliable' : 'Coming Soon'}
            subtext={
              disabled
                ? `This Category of products is no longer avaliable or has been disabled`
                : `Check back here soon, new products added weekly`
            }
            showContact
          />
        )}
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
        disabled
        variants {
          price
          variantName
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
            disabled
            variants {
              price
              variantName
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

categoryRoute.propTypes = {
  data: propTypes.any,
  pageContext: propTypes.any,
};

export default categoryRoute;
