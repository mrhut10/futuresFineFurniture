import React from 'react';
import * as R from 'ramda';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import Wrapper from '../components/Wrapper';
import SEO from '../components/SEO';
import {
  applyDiscountToVariant,
  activeVariant,
} from '../helpers/snipcart_sanityToJSON';
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
    R.take(3),
    R.apply(R.union)
  )([relatedByRange, relatedByCategory]);

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
      <div className="flex flex-col max-w-4xl mx-auto p-4 w-full">
        <hr />
        <h2 className="font-bold mb-4 mt-6 text-2xl text-maroon-600">
          Related Products
        </h2>
        <div className="flex flex-wrap -mx-2 w-full">
          {selectedRelated.map(relatedProduct => (
            <CategoryTitle
              name={relatedProduct.name}
              hoverText={relatedProduct.name}
              key={relatedProduct._id}
              images={relatedProduct.images.map(
                image => image.image.asset.fluid
              )}
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
          ...fieldsProductVariant
        }
        range {
          _id
          name
          slug {
            current
          }
          keywords
        }
        category {
          ...fieldsSanityCategory
        }
        images {
          image {
            asset {
              fluid(maxWidth: 300) {
                ...GatsbySanityImageFluid
              }
            }
          }
        }
      }
    }
    relatedByCategory: allSanityProduct(
      filter: {
        _id: { ne: $productID }
        category: { _id: { eq: $categoryID } }
      }
    ) {
      nodes {
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
          ...fieldsProductVariant
        }
        range {
          _id
          name
          slug {
            current
          }
          keywords
        }
        category {
          ...fieldsSanityCategory
        }
        images {
          image {
            asset {
              fluid(maxWidth: 300) {
                ...GatsbySanityImageFluid
              }
            }
          }
        }
      }
    }
  }
`;
