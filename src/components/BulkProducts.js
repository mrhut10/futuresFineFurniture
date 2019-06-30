import React from 'react';
import propTypes from 'prop-types';
import { ProductTile } from './ProductTile';

export const BulkProducts = ({ products, heading, maxLimit }) => (
  <>
    <hr />
    <br />
    {heading ? <h2 className="px-2 w-full">{heading}</h2> : null}
    <div className="flex flex-wrap w-full">
      {// product { name, images, slug, minPriceCents, range, variants }
      products
        // limit to maxLimit or if no limit don't
        .filter((t, i) => (maxLimit ? i < maxLimit : true))
        // map to ProductTile
        .map(product => {
          const { name, images, variants, varientLock, slug } = product;
          return (
            <ProductTile
              key={name}
              name={name}
              ProductImages={images}
              slug={slug}
              varientLock={varientLock}
              varients={variants}
            />
          );
        })}
    </div>
    <br />
  </>
);

BulkProducts.propTypes = {
  heading: propTypes.string,
  maxLimit: propTypes.number,
  products: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string.isRequired,
      images: propTypes.arrayOf(propTypes.string),
      slug: propTypes.string.isRequired,
      variantsLock: propTypes.string,
      variants: propTypes.arrayOf(
        propTypes.shape({
          varientName: propTypes.string,
          price: propTypes.number,
          discount: propTypes.number,
        })
      ).isRequired,
    })
  ),
};
