import React from 'react';
import * as R from 'ramda';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Wrapper from '../components/Wrapper';
import SEO from '../components/SEO';
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
    R.compose(
      R.map(
        R.compose(
          R.zipObj(['src', 'srcSet']),
          R.juxt([R.prop('src'), R.prop('srcSet')]),
          R.path(['image', 'asset', 'fluid'])
        )
      ),
      R.prop('images')
    ),
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
              <Link to={`/sanity/category/${category.slug}`.toLowerCase()}>
                {category.name} Category
              </Link>
            </h3>
            {disable ? <NotAvaliable text="No Longer Avaliable" /> : ''}
            <div className="flex flex-wrap">
              <div className="flex items-center justify-center mb-4 md:pr-12 object-cover text-center w-full md:w-1/2">
                {images && images[0] ? (
                  <img
                    src={images[0].src}
                    srcSet={images[0].srcSet}
                    alt="product"
                  />
                ) : null}
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
            {description.split('\n').map(line => (
              <>
                {line} <br />
              </>
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};
/* const productRoute = ({ data, pageContext, location }) => {
  const product = R.compose(
    R.zipObj(['id', 'name', 'slug', 'disable', 'variants', 'images', 'description', 'range']),
    R.juxt(
    ),
    R.prop('sanityProduct')
  )(data);

  const {name, id, disable, variants, images, description, range}
  const { name, id, variants, keywords, category, images, disable, ranges, description, discount } = product;
  return (
    <Layout>
      <SEO title={name} keywords={keywords} />
      <Wrapper>
        {product ? (
          <div className="mb-8 text-center">
            <h1 className="font-bold text-3xl text-maroon-600">{name}</h1>
            {disable ? <NotAvaliable text="No Longer Avaliable" /> : null}
            {ranges ? (
              <h3>
                <Link to={`/sanity/category/${category.slug.current}`.toLowerCase()}>{category.name}</Link> Category
                <br/>
                Within ranges : {ranges.map(range => <Link to={`/collections/?range=${range.slug}`.toLowerCase()}>{range.name}</Link>)}
              </h3>
            ) : null}
            <div className="flex flex-wrap">
              <div className="flex items-center justify-center mb-4 md:pr-12 object-cover text-center w-full md:w-1/2">
                <img src={images && images[0] && images[0].src ? images[0].src : ''} alt="product" />
              </div>
              <div className="flex flex-1 w-full md:w-1/2">
                <BuyArea
                  name={name}
                  id={name}
                  image={images && images[0] && images[0].src ? images[0].src || '' : ''}
                  url="https://www.futuresfinefurnitureandbedding.com/snipcart.json"
                  description={undefined}
                  variants={variants.map(variant => ({
                    name: variant.name,
                    price: variant.price * 100,
                    disable: variant.disable,
                    discount:
                      (variant.price -
                        applyDiscountToPrice(variant.price, discount)) *
                      100,
                  }))}
                  disabled={disable}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-8 text-center">
            <NotAvaliable text="Product Not Found" />
          </div>
        )}
        <div className="bg-white mt-12 px-4 py-12 rounded-lg shadow-md hover:shadow-lg">
          <div className="markdown max-w-md mx-auto">{description}</div>
        </div>
      </Wrapper>
      <div 
        id="relatedProducts"
        className="flex flex-col max-w-4xl mx-auto p-4 w-full"
      >
        <h3>Other Products In Range</h3>
        <ProductGroupRender
          products={Products({
            filters: [
              target =>
                target.ranges.some(targetRange =>
                  ranges.some(range => range.id === targetRange.id)
                ),
              target => (target.disable || false) !== true,
            ],
            pageNum: 1,
            perPage: 3,
          })}
        />
      </div>
    </Layout>
  );
};
*/

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
            fluid(maxWidth: 1000) {
              src
              srcSet
            }
          }
        }
      }
    }
  }
`;
