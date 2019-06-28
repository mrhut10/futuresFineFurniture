import React from 'react';
import { graphql } from 'gatsby';
import * as R from 'ramda';
import propTypes from 'prop-types';
import Layout from '../components/layout';
import Wrapper from '../components/wrapper';
import { BuyArea } from '../components/snipcart';
import SEO from '../components/seo';
import { BulkProducts } from '../components/BulkProducts';

const details = R.compose(
  dangHtml => (
    <div>
      <p dangerouslySetInnerHTML={{ __html: dangHtml }} />
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

const RangeCatigoryString = (range, catigory) => {
  let output;
  if (range && catigory)
    output = `From the ${catigory} Collection and the ${range} range`;
  else if (range) output = `From the ${catigory} Collection`;
  else if (catigory) output = `From the ${range} range`;
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
          ...R.map(R.prop('varientName'))(variants),
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
        <div className="pt-8">
          <div className="px-4">
            <h1>{title}</h1>
            <h3>{RangeCatigoryString(range, Category)}</h3>
          </div>
          <br />
          <div className="text-left m-4">
            <div className="md:float-left mb-4 md:pr-8 text-center w-full md:w-1/2">
              {R.compose(
                ImageComponent,
                images
              )(data)}
            </div>
            <div className="px-4 w-full">
              <BuyArea
                name={title}
                id={title}
                image={undefined}
                url="https://www.futuresfinefurnitureandbedding.com/snipcart.json"
                description={undefined}
                varients={variants}
                qty={qty}
              />
              <br />
              {details(data)}
            </div>
          </div>
        </div>
      </Wrapper>
      <div
        id="relatedProducts"
        className="flex flex-col max-w-lg mx-auto p-4 w-full"
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
                const weightedStringByCatigory = CatName =>
                  CatName === data.markdownRemark.frontmatter.Category
                    ? `_${CatName}` // this should make it sort first
                    : CatName;
                const [weightedA, weightedB] = [
                  weightedStringByCatigory(productA.Category),
                  weightedStringByCatigory(productB.Category),
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
          varientName
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
              varientName
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
