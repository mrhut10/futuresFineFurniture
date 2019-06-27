import React from 'react';
import propTypes from 'prop-types';
import { ProductTile } from './ProductTile';

export const BulkProducts = ({ products }) => (
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
);

BulkProducts.propTypes = {
  products: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string.isRequired,
      Images: propTypes.arrayOf(propTypes.string),
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
