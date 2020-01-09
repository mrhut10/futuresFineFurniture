import React from 'react';
import * as R from 'ramda';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Wrapper from '../components/Wrapper';
import SEO from '../components/SEO';
import Img from 'gatsby-image';
import {
  applyDiscountToVariant,
  activeVariant,
} from '../helpers/snipcart_sanityToJSON';
import NotAvaliable from '../components/NotAvaliable';
import { NewBuyArea } from '../components/newSnipcart';

const getProductDataFromQuery = R.compose(
  R.zipObj([
    'id',
    'name',
    'disable',
    'slug',
    'keywords',
    'description',
    'variants',
    'ranges',
    'category',
    'images',
  ]),
  R.juxt([
    // id
    R.prop('_id'),
    // name
    R.prop('name'),
    // disable
    R.path(['common', 'disable']),
    // slug
    R.path(['slug', 'current']),
    // keywords
    R.prop('keywords'),
    // description
    R.prop('description'),
    // variants
    R.prop('variants'),
    // ranges
    R.compose(
      R.map(
        R.zipObj(['name', 'slug', 'keywords']),
        R.juxt([
          R.prop('name'),
          R.path(['slug', 'current']),
          R.prop('keywords'),
        ])
      ),
      R.prop('range')
    ),
    // category
    R.compose(
      R.map(
        R.zipObj(['name', 'slug', 'keywords']),
        R.juxt([
          R.prop('name'),
          R.path(['slug', 'current']),
          R.prop('keywords'),
        ])
      ),
      R.prop('category')
    ),
    // images
    R.compose(R.map(R.path(['image', 'asset'])), R.prop('images')),
  ]),
  R.prop('sanityProduct')
);

const productRoute = ({ data }) => {
  const productData = getProductDataFromQuery(data);
  /* 'id', 'name', 'slug', 'keywords', 'description', 'variants', 'ranges', 'category', 'images' */

  const {
    id,
    name,
    disable,
    category,
    images,
    variants,
    description,
  } = productData;

  return (
    <Layout>
      <SEO title={name} keywords={productData.keywords} />
      <Wrapper>
        {productData ? (
          <div className="mb-8 text-center">
            <h1 className="font-bold text-3xl text-maroon-600">{name}</h1>
            <h3>
              <Link to={`/category/${category.slug}`.toLowerCase()}>
                {category.name} Category
              </Link>
            </h3>
            {disable ? <NotAvaliable text="No Longer Avaliable" /> : ''}
            <div className="flex flex-wrap">
              <div className="items-center justify-center mb-4 md:pr-12 object-cover text-center w-full md:w-1/2">
                <Img
                  fluid={images && images[0] ? images[0].fluid : undefined}
                  alt="product"
                />
              </div>
              <div className="flex flex-1 w-full md:w-1/2">
                <NewBuyArea
                  id={id}
                  name={name}
                  disable={disable}
                  url="/snipcart.json"
                  variants={variants}
                />
              </div>
            </div>
          </div>
        ) : (
          'no product data found'
        )}
        <div className="bg-white mt-12 px-4 py-12 rounded-lg shadow-md hover:shadow-lg">
          <div className="markdown max-w-md mx-auto">
            {description
              ? description.split('\n').map(line => (
                  <>
                    {line} <br />
                  </>
                ))
              : ''}
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

export default productRoute;
export const query = graphql`
  query MyQuery($productID: String) {
    sanityProduct(_id: { eq: $productID }) {
      _id
      name
      common {
        disable
      }
      slug {
        current
      }
      keywords
      description
      variants {
        name
        price
        discount_method
        discount_amount
        disable
      }
      range {
        name
        slug {
          current
        }
        keywords
      }
      category {
        slug {
          current
        }
        name
        keywords
      }
      images {
        image {
          asset {
            fluid(maxWidth: 700) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
