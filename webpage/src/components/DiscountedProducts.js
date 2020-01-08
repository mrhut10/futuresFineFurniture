import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import * as R from 'ramda';
import CategoryTitle from './CategoryTile';
// import CategoryTitle from './CategoryTile';

const queryToProductData = R.compose(
  R.map(
    R.compose(
      R.zipObj(['id', 'name', 'images', 'slug', 'variants', 'category']),
      R.juxt([
        // id
        R.prop('id'),
        // name
        R.prop('name'),
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
        // slug
        R.compose(R.toLower, R.path(['slug', 'current'])),
        // variants (discounted)
        R.compose(
          R.filter(
            variant => variant.discount_amount > 0 && variant.disable !== false
          ),
          R.prop('variants')
        ),
        // category
        R.compose(
          R.objOf('slug'),
          R.toLower,
          R.path(['category', 'slug', 'current'])
        ),
      ])
    )
  ),
  R.path(['allSanityProduct', 'nodes'])
);

const DiscountedProducts = () => {
  return (
    <StaticQuery
      query={graphql`
        {
          allSanityProduct(
            filter: {
              variants: {
                elemMatch: { discount_amount: { gt: 0 }, disable: { ne: true } }
              }
              common: { disable: { ne: true } }
              slug: { current: { ne: "" } }
            }
            limit: 3
            sort: { fields: _updatedAt }
          ) {
            nodes {
              id
              name
              images {
                image {
                  asset {
                    fluid(maxWidth: 200) {
                      src
                      srcSet
                    }
                  }
                }
              }
              slug {
                current
              }
              variants {
                disable
                discount_amount
                discount_method
                name
                price
              }
              category {
                slug {
                  current
                }
              }
            }
          }
        }
      `}
      render={queryData =>
        R.compose(
          productData => (
            <div className="flex flex-wrap justify-center mx-auto w-full">
              <div className="flex flex-wrap -m-2">
                {productData.map(input => (
                  <CategoryTitle
                    key={input.id}
                    name={input.name}
                    slug={`/category/${input.category.slug}/${input.slug}`}
                    hoverText={input.name}
                    images={input.images}
                    comingSoon={false}
                    height={300}
                  />
                ))}
              </div>
            </div>
          ),
          queryToProductData
        )(queryData)
      }
    />
  );
};

export default DiscountedProducts;
