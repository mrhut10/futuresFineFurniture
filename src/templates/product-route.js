/* eslint-disable react/no-danger */
import React from 'react';
import { graphql } from 'gatsby';
import * as R from 'ramda';
import propTypes from 'prop-types';
import Layout from '../components/Layout';
import Wrapper from '../components/Wrapper';
import { BuyArea } from '../components/Snipcart';
import SEO from '../components/SEO';
import { BulkProducts } from '../components/BulkProducts';

const details = R.compose(
  html => (
    <div className="bg-white mt-12 px-4 py-12 rounded-lg shadow-md hover:shadow-lg">
      <div
        className="markdown max-w-md mx-auto"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  ),
  R.pathOr('', ['markdownRemark', 'html'])
);

const ImageComponent = input =>
  input ? <img alt="product" src={input} /> : null;

const images = R.compose(
  R.lift(
    R.compose(R.pathOr(null, ['node', 'childImageSharp', 'fluid', 'src']))
  ),
  R.pathOr([], ['allFile', 'edges'])
);

// const getSafePath = (p, o) => p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o)

const RangeCategoryString = (range, category) => {
  let output;
  if (range && category)
    output = `From the ${category} Collection and the ${range} range`;
  else if (range) output = `From the ${category} Collection`;
  else if (category) output = `From the ${range} range`;
  return output;
};

const productRoute = ({ data }) => {
  const {
    title,
    Category,
    range,
    variants,
    qty,
  } = data.markdownRemark.frontmatter;
  return (
    <Layout>
      <SEO
        title={title}
        keywords={[
          title,
          Category,
          'furniture',
          range,
          ...R.map(R.prop('variantName'))(variants),
        ]}
        image={R.compose(
          input =>
            `https://${process.env.DEPLOY_URL ||
              'futuresfinefurnitureandbedding.com'}${input}`,
          R.head,
          images
        )(data)}
      />
      <Wrapper>
        <div className="mb-8 text-center">
          <h1 className="font-bold text-3xl text-maroon-600">{title}</h1>
          <h3>{RangeCategoryString(range, Category)}</h3>
        </div>
        <div className="flex flex-wrap">
          <div className="flex items-center justify-center mb-4 md:pr-12 object-cover text-center w-full md:w-1/2">
            {R.compose(
              ImageComponent,
              images
            )(data)}
          </div>
          <div className="flex flex-1 w-full md:w-1/2">
            <BuyArea
              name={title}
              id={title}
              image={undefined}
              url="https://www.futuresfinefurnitureandbedding.com/snipcart.json"
              description={undefined}
              variants={variants}
              qty={qty}
            />
          </div>
        </div>
        {details(data)}
      </Wrapper>
      <div
        id="relatedProducts"
        className="flex flex-col max-w-4xl mx-auto p-4 w-full"
      >
        {
          <BulkProducts
            heading="More products from this range"
            maxLimit={3}
            products={data.allMarkdownRemark.edges
              .map(({ node }) => {
                const output = {
                  name: node.frontmatter.title,
                  images: node.frontmatter.images,
                  slug: node.fields.slug,
                  range: node.frontmatter.range,
                  variants: node.frontmatter.variants,
                  Category: node.frontmatter.Category,
                };
                return output;
              })
              .filter(
                product =>
                  product.range === data.markdownRemark.frontmatter.range &&
                  product.name !== data.markdownRemark.frontmatter.title
              )
              .sort((productA, productB) =>
                // alpha by name
                String(productA.name).localeCompare(String(productB.name))
              )
              .sort((productA, productB) => {
                // sort by weighted category
                const weightedStringByCategory = CatName =>
                  CatName === data.markdownRemark.frontmatter.Category
                    ? `_${CatName}` // this should make it sort first
                    : CatName;
                const [weightedA, weightedB] = [
                  weightedStringByCategory(productA.Category),
                  weightedStringByCategory(productB.Category),
                ];
                return weightedA.localeCompare(weightedB);
              })}
          />
        }
      </div>
    </Layout>
  );
};

// markdownRemark(frontmatter: {title: {eq: $slug}}) {
export const query = graphql`
  query($productName: String!, $images: [String]) {
    allFile(
      filter: {
        relativePath: { in: $images }
        sourceInstanceName: { eq: "contentImages" }
      }
    ) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 400) {
              src
            }
          }
        }
      }
    }
    markdownRemark(
      fields: { type: { eq: "product" }, productName: { eq: $productName } }
    ) {
      html
      frontmatter {
        title
        enabled
        Category
        range
        variants {
          price
          variantName
          discount
          qty
        }
      }
      fields {
        type
        slug
        catName
        productName
        category
      }
    }
    allMarkdownRemark(filter: { fields: { type: { eq: "product" } } }) {
      edges {
        node {
          fields {
            slug
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

productRoute.propTypes = {
  data: propTypes.any,
};

export default productRoute;
