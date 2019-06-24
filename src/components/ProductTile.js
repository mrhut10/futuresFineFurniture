import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import propTypes from 'prop-types';
import { intToPriceFormat } from '../helpers/index';
import { BuyButton } from './snipcart';
import CategoryTitle from './categoryTile';

export const ProductTile = ({ name, ProductImageName, varients, varientLock, slug }) => {
  const removeDiscount = item =>
    item.price - (item.discount && item.discount > 0 ? item.discount : 0);
  const minPricedVarient = varients
    .filter(varient => varient.price && varient.price > 0)
    .sort((a, b) => removeDiscount(a) - removeDiscount(b))
    .find(() => true); // cheat way of making a head function

  return (
    <StaticQuery
      query={graphql`
        {
          allFile(filter: { sourceInstanceName: { eq: "contentImages" } }) {
            edges {
              node {
                relativePath
                childImageSharp {
                  fluid(maxWidth: 400) {
                    src
                  }
                }
              }
            }
          }
        }
      `}
      render={queryData => (
        <CategoryTitle
          name={name + (varientLock ? ` / ${varientLock}` : '')}
          hoverText={name}
          key={name + (varientLock ? `/${varientLock}` : '')}
          images={ProductImageName}
          slug={slug}
          Children={
            <div className="flex font-semibold items-baseline justify-between mt-auto mx-auto p-4">
              <small>
                from {intToPriceFormat(removeDiscount(minPricedVarient))}
              </small>
              <BuyButton
                name={name}
                id={name}
                url="https://www.futuresfinefurnitureandbedding.com/snipcart.json"
                price={varients[0].price}
                varients={varients}
                value={minPricedVarient.varientName}
              >
                Add&nbsp;to&nbsp;Cart
              </BuyButton>
            </div>
          }
        />
      )}
    />
  );
};

export const ProductVarient = ({ varientName, price, discount }) =>
  Object({ varientName, price, discount });

ProductTile.propTypes = {
  name: propTypes.string,
  images: propTypes.arrayOf(propTypes.string),
  varients: propTypes.arrayOf(propTypes.object),
  varientLock: propTypes.string,
  slug: propTypes.string,
};
