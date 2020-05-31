import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import * as R from 'ramda';
import PropTypes from 'prop-types';

import CategoryTitle from './CategoryTile';
import { applyDiscountToVariant } from '../helpers/snipcart_sanityToJSON';
import { priceFormat } from '../helpers';

const queryToProductData = quantity =>
  R.compose(
    R.take(quantity),
    /* R.sortBy(
    product =>
      (product.selectedVariant.price -
        applyDiscountToVariant(product.selectedVariant)) /
      product.selectedVariant.price
  ), */
    R.flatten,
    R.map(
      R.compose(
        // map to many copies with each selected variant
        product => {
          const output = [];
          const { id, name, images, slug, variants, category } = product;
          product.variants.forEach(variant => {
            output.push({
              id,
              name,
              images,
              slug,
              variants,
              category,
              selectedVariant: variant,
            });
          });
          return output;
        },
        R.zipObj(['id', 'name', 'images', 'slug', 'variants', 'category']),
        R.juxt([
          // id
          R.prop('id'),
          // name
          R.prop('name'),
          // images
          R.compose(R.map(R.path(['image', 'asset'])), R.prop('images')),
          // slug
          R.compose(R.toLower, R.path(['slug', 'current'])),
          // variants (discounted)
          R.compose(
            // first unquie by sell price
            R.uniqBy(applyDiscountToVariant),
            // filters out non discounted variants
            R.filter(
              variant =>
                variant.discount_amount >= 0 && variant.disable !== false
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

const ProductsRecentlyModified = ({ quantity }) => {
  return (
    <StaticQuery
      query={graphql`
        {
          allSanityProduct(
            filter: {
              variants: { elemMatch: { disable: { ne: true } } }
              common: { disable: { ne: true } }
              slug: { current: { ne: "" } }
            }
            limit: 100
            sort: { fields: _createdAt, order: DESC }
          ) {
            nodes {
              ...fieldsSanityProduct
            }
          }
        }
      `}
      render={queryData =>
        R.compose(
          productData => (
            <div className="flex flex-wrap justify-center w-full mx-auto">
              <div className="flex flex-wrap -m-2">
                {productData.map((input, index) => {
                  const slug = `/category/${input.category.slug}/${input.slug}`;
                  return (
                    <CategoryTitle
                      key={index}
                      name={`${input.name} ${
                        input.selectedVariant.name
                          ? `(${input.selectedVariant.name})`
                          : ''
                      }`}
                      slug={`/category/${input.category.slug}/${input.slug}`}
                      hoverText={input.name}
                      images={input.images.map(i => ({ fluid: i.fluid_mid }))}
                      comingSoon={false}
                      height={300}
                      Children={
                        <Link to={slug}>
                          {/*
                            <div className="text-red-500 line-through">
                              WAS FROM {priceFormat.format(input.selectedVariant.price)}
                            </div>
                          */}
                          <div className="text-blue-500">
                            NOW{' '}
                            {priceFormat.format(
                              applyDiscountToVariant(input.selectedVariant)
                            )}
                          </div>
                          {applyDiscountToVariant(input.selectedVariant) <
                          input.selectedVariant.price ? (
                            <div className="text-gray-500">
                              SAVINGS OF{' '}
                              {priceFormat.format(
                                input.selectedVariant.price -
                                  applyDiscountToVariant(input.selectedVariant)
                              )}
                            </div>
                          ) : (
                            ''
                          )}
                        </Link>
                      }
                    />
                  );
                })}
              </div>
            </div>
          ),
          queryToProductData(quantity)
        )(queryData)
      }
    />
  );
};

ProductsRecentlyModified.propTypes = {
  quantity: PropTypes.number.isRequired,
};

export default ProductsRecentlyModified;
