import React from 'react';
import propTypes from 'prop-types';
import { ProductTile } from './ProductTile';

export const BulkProducts = ({ products, heading }) => (
  <div>
    {heading ? <h4>{heading}</h4> : null}
    <div className="flex flex-wrap w-full">
      {// product { name, images, slug, minPriceCents, range, variants }
      products.map(product => {
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
  </div>
);

BulkProducts.propTypes = {
  products: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string.isRequired,
      images: propTypes.arrayOf(propTypes.string),
      slug: propTypes.string.isRequired,
      varientLock: propTypes.string,
      varients: propTypes.arrayOf(
        propTypes.shape({
          varientName: propTypes.string,
          price: propTypes.number,
          discount: propTypes.number,
        })
      ).isRequired,
    })
  ),
};
