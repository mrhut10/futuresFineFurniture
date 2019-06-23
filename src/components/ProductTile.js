import React from 'react';
import propTypes from 'prop-types';
import { intToPriceFormat } from '../helpers/index';
import { BuyButton } from './snipcart';
import CategoryTitle from './categoryTile';

const removeDiscount = ({ price, discount }) =>
  price - (discount && discount > 0 ? discount : 0);

export const ProductTile = ({ name, images, varients, varientLock, slug }) => {
  const minPricedVarient = varients
    .filter(({ price }) => price && price > 0)
    .sort((a, b) => removeDiscount(a) - removeDiscount(b))[0];

  return (
    <CategoryTitle
      name={name + (varientLock ? ` / ${varientLock}` : '')}
      hoverText={name}
      key={name + (varientLock ? `/${varientLock}` : '')}
      images={images}
      slug={slug}
      Children={
        <div className="flex font-semibold items-baseline justify-between mt-auto mx-auto p-4">
          {minPricedVarient ? (
            <>
              <small>
                from {intToPriceFormat(removeDiscount(minPricedVarient))}
              </small>
              <BuyButton
                key={name}
                name={name}
                id={name}
                url="https://www.futuresfinefurnitureandbedding.com/snipcart.json"
                price={removeDiscount(varients[0])}
                varients={varients}
                value={minPricedVarient.varientName}
              >
                Add&nbsp;to&nbsp;Cart
              </BuyButton>
            </>
          ) : (
            <>see details</>
          )}
        </div>
      }
    />
  );
};

export const ProductVarient = ({ varientName, price, discount }) =>
  Object({ varientName, price, discount });

ProductTile.propTypes = {
  name: propTypes.string,
  images: propTypes.any,
  varients: propTypes.arrayOf(propTypes.object),
  varientLock: propTypes.any,
  slug: propTypes.string,
};
