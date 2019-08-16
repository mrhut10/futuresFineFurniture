import React from 'react';
import propTypes from 'prop-types';

import { ProductTile } from './ProductTile';

export const BulkProducts = ({ products, heading, maxLimit, footer }) => (
  <>
    <hr />
    {heading ? (
      <h2 className="font-bold mb-4 mt-6 text-2xl text-maroon-600">
        {heading}
      </h2>
    ) : null}
    <div className="flex flex-wrap -mx-2 w-full">
      {// product { name, images, slug, minPriceCents, range, variants }
      products
        // limit to maxLimit or if no limit don't
        .filter((t, i) => (maxLimit ? i < maxLimit : true))
        // map to ProductTile
        .map(product => {
          const { name, images, variants, variantLock, slug } = product;
          return (
            <ProductTile
              key={name}
              name={name}
              ProductImages={images}
              slug={slug}
              variantLock={variantLock}
              variants={variants}
            />
          );
        })}
    </div>
    <div>{footer}</div>
    <br />
  </>
);

BulkProducts.propTypes = {
  heading: propTypes.element,
  footer: propTypes.element,
  maxLimit: propTypes.number,
  products: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string.isRequired,
      images: propTypes.arrayOf(propTypes.string),
      slug: propTypes.string.isRequired,
      variantLock: propTypes.string,
      variants: propTypes.arrayOf(
        propTypes.shape({
          variantName: propTypes.string,
          price: propTypes.number,
          discount: propTypes.number,
          disabled: propTypes.bool,
        })
      ).isRequired,
    })
  ),
};
