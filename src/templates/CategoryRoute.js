import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Wrapper from '../components/wrapper';
import CategoryTitle from '../components/categoryTile';
import ComingSoon from '../components/ComingSoon';
import SEO from '../components/seo';

const R = require('ramda');

const formatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: true,
});

const GetSourceImages = R.compose(
  R.lift(input => ({
    relativePath: R.pathOr('', ['node', 'relativePath'])(input),
    source: R.pathOr('', ['node', 'childImageSharp', 'fixed', 'src'])(input),
  })),
  R.pathOr([], ['allFile', 'edges'])
);

const findImage = R.compose(
  R.last,
  R.split('/'),
  input => String(input),
  R.pathOr('', ['frontmatter', 'images'])
);

export default ({ data, pageContext }) => {
  const post = data.cat;
  const { products } = data;
  const sourceImages = GetSourceImages(data);

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
          <div className="flex flex-wrap justify-center w-full">
            {products ? (
              products.edges
                .map(({ node }) => ({
                  title: node.frontmatter.title,
                  images: R.compose(
                    R.pathOr('', ['source']),
                    R.find(
                      R.compose(
                        R.equals(findImage(node)),
                        R.pathOr('', ['relativePath'])
                      )
                    )
                  )(sourceImages),
                  slug: `${pageContext.slug}/${node.fields.productName}`,
                  minPriceCents: R.compose(
                    R.head,
                    R.sort((a, b) => a - b),
                    R.lift(R.prop('price')),
                    R.pathOr([], ['frontmatter', 'variants'])
                  )(node),
                  range: R.pathOr([], ['frontmatter', 'range'])(node),
                }))
                .sort((a, b) => a.minPriceCents - b.minPriceCents)
                .sort((a, b) => String(a.range).localeCompare(String(b.range)))
                .map(input => (
                  <CategoryTitle
                    key={input.title}
                    name={input.title}
                    slug={input.slug}
                    images={input.images}
                    Children={R.compose(
                      input =>
                        input ? (
                          <p className="mt-auto mx-auto text-red-dark">
                            from {formatter.format(input)}
                          </p>
                        ) : null,
                      R.divide(R.__, 100),
                      R.propOr(0, 'minPriceCents')
                    )(input)}
                  />
                ))
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
            fixed(width: 200) {
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
