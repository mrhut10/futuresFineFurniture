import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import propTypes from 'prop-types';
import * as R from 'ramda';
import { intToPriceFormat } from '../helpers/index';
import { BuyButton } from './snipcart';
import CategoryTitle from './categoryTile';

const GetSourceImages = R.compose(
  R.lift(input => ({
    relativePath: R.pathOr('', ['node', 'relativePath'])(input),
    source: R.pathOr('', ['node', 'childImageSharp', 'fluid', 'src'])(input),
    srcSet: R.pathOr('', ['node', 'childImageSharp', 'fluid', 'srcSet'])(input),
  })),
  R.pathOr([], ['allFile', 'edges'])
);

export const ProductTile = ({
  name,
  ProductImages,
  varients,
  varientLock,
  slug,
}) => {
  const removeDiscount = item =>
    item.price - (item.discount && item.discount > 0 ? item.discount : 0);
  const minPricedVarient = varients
    .filter(({ price }) => price && price > 0)
    .sort((a, b) => removeDiscount(a) - removeDiscount(b))[0];

  const GetFileName = R.compose(
    R.last,
    R.split('/')
  );

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
                    srcSet
                  }
                }
              }
            }
          }
        }
      `}
      render={queryData => {
        const sourceImages = GetSourceImages(queryData);
        // const ImagefileNames = GetFileNames(ProductImageName);
        const MapImageFileNamesToSourceSet = R.compose(
          R.map(prodIm =>
            sourceImages.find(
              sourceIm =>
                GetFileName(sourceIm.relativePath) === GetFileName(prodIm)
            )
          )
        )(ProductImages);

        return (
          <CategoryTitle
            name={name + (varientLock ? ` / ${varientLock}` : '')}
            hoverText={name}
            key={name + (varientLock ? `/${varientLock}` : '')}
            images={MapImageFileNamesToSourceSet}
            slug={slug}
            Children={
              minPricedVarient ? (
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
              ) : (
                <>see details</>
              )
            }
          />
        );
      }}
    />
  );
};

export const ProductVarient = ({ varientName, price, discount }) =>
  Object({ varientName, price, discount });

ProductTile.propTypes = {
  name: propTypes.string,
  ProductImages: propTypes.arrayOf(propTypes.object),
  varients: propTypes.arrayOf(propTypes.object),
  varientLock: propTypes.any,
  slug: propTypes.string,
};
