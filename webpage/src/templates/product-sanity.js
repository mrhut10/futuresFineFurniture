import React, { Fragment } from 'react';
import * as R from 'ramda';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import Wrapper from '../components/Wrapper';
import SEO from '../components/SEO';
import // applyDiscountToVariant,
// activeVariant,
'../helpers/snipcart_sanityToJSON';
import NotAvaliable from '../components/NotAvaliable';
import { NewBuyArea } from '../components/newSnipcart';
import CategoryTitle from '../components/CategoryTile';

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
    'relatedByRange',
    'relatedByCategory',
  ]),
  R.juxt([
    // id
    R.path(['sanityProduct', '_id']),
    // name
    R.path(['sanityProduct', 'name']),
    // disable
    R.path(['sanityProduct', 'common', 'disable']),
    // slug
    R.path(['sanityProduct', 'slug', 'current']),
    // keywords
    R.path(['sanityProduct', 'keywords']),
    // description
    R.path(['sanityProduct', 'description']),
    // variants
    R.path(['sanityProduct', 'variants']),
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
      R.path(['sanityProduct', 'range'])
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
      R.path(['sanityProduct', 'category'])
    ),
    // images
    R.compose(
      R.map(R.path(['image', 'asset'])),
      R.path(['sanityProduct', 'images'])
    ),
    // 'relatedByRange',
    R.path(['relatedByRange', 'nodes']),
    // 'relatedByCategory',
    R.path(['relatedByCategory', 'nodes']),
  ])
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
    relatedByRange,
    relatedByCategory,
  } = productData;

  // const allRelated = R.union(relatedByRange, relatedByCategory);
  const selectedRelated = R.compose(
    R.take(6),
    R.apply(R.union)
  )([relatedByRange, relatedByCategory]);

  return (
    <Layout>
      <SEO title={name} keywords={productData.keywords} />
      <Wrapper>
        {productData ? (
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-maroon-600">{name}</h1>
            <h3>
              <Link to={`/category/${category.slug}`.toLowerCase()}>
                {category.name} Category
              </Link>
            </h3>
            {disable ? <NotAvaliable text="No Longer Avaliable" /> : ''}
            <div className="flex flex-wrap">
              <div className="items-center justify-center object-cover w-full mb-4 text-center md:pr-12 md:w-1/2">
                <Img
                  alt="product"
                  fluid={
                    images
                      ? images.map(i => i.fluid_lrg).find(() => true)
                      : 'Hi No Image Here'
                  }
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
        <div className="px-4 py-12 mt-12 bg-white rounded-lg shadow-md hover:shadow-lg">
          <div className="max-w-md mx-auto markdown">
            {description
              ? description.split('\n').map((line, index) => (
                  <Fragment key={index}>
                    {line} <br />
                  </Fragment>
                ))
              : ''}
          </div>
        </div>
      </Wrapper>
      <div className="flex flex-col w-full max-w-4xl p-4 mx-auto">
        <hr />
        <h2 className="mt-6 mb-4 text-2xl font-bold text-maroon-600">
          Related Products
        </h2>
        <div className="flex flex-wrap w-full -mx-2">
          {selectedRelated.map(relatedProduct => (
            <CategoryTitle
              name={relatedProduct.name}
              hoverText={relatedProduct.name}
              key={relatedProduct._id}
              images={relatedProduct.images.map(image => ({
                fluid: image.image.asset.fluid_mid,
              }))}
              slug={`/category/${relatedProduct.category.slug.current}/${relatedProduct.slug.current}`.toLowerCase()}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default productRoute;
export const query = graphql`
  query MyQuery($productID: String, $categoryID: String, $rangeIDs: [String]) {
    sanityProduct(_id: { eq: $productID }) {
      ...fieldsSanityProduct
    }
    relatedByRange: allSanityProduct(
      filter: {
        range: { elemMatch: { _id: { in: $rangeIDs } } }
        _id: { ne: $productID }
      }
    ) {
      nodes {
        ...fieldsSanityProduct
      }
    }
    relatedByCategory: allSanityProduct(
      filter: {
        _id: { ne: $productID }
        category: { _id: { eq: $categoryID } }
      }
    ) {
      nodes {
        ...fieldsSanityProduct
      }
    }
  }
`;
