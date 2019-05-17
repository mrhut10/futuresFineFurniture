import React from 'react';
import { graphql } from 'gatsby';
import * as R from 'ramda';
import propTypes from 'prop-types';
import Layout from '../components/layout';
import Wrapper from '../components/wrapper';
import { BuyArea } from '../components/snipcart';
import SEO from '../components/seo';

// const average = R.converge(R.divide, [R.sum, R.length])
const formatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: true,
});

const details = R.compose(
  dangHtml => (
    <div
    // style={{ flex: '0 1 auto', order: 2, maxWidth: '250px' }}
    >
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

const productRoute = ({ data, location }) => {
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
        <div className="text-center">
          <h1>{title}</h1>
          <h2>{RangeCatigoryString(range, Category)}</h2>
          <div className="text-left m-4">
            <div className="float-left w-full md:w-1/2">
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
  }
`;

productRoute.propTypes = {
  data: propTypes.any,
  location: propTypes.string,
};

export default productRoute;
