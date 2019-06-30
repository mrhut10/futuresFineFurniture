import React from 'react';
import { graphql, Link, StaticQuery } from 'gatsby';
import propTypes from 'prop-types';
import * as R from 'ramda';

import { intToPriceFormat } from '../helpers/index';
import { BuyButton } from './Snipcart';
import CategoryTitle from './CategoryTile';

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
  variants,
  variantLock,
  slug,
}) => {
  const removeDiscount = item =>
    item.price - (item.discount && item.discount > 0 ? item.discount : 0);
  const selectedVariant =
    variantLock && variants.find(vari => vari.variantName === variantLock)
      ? variants.find(vari => vari.variantName === variantLock)
      : // min priced variant
        variants
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
            name={name + (variantLock ? ` / ${variantLock}` : '')}
            hoverText={name}
            key={name + (variantLock ? `/${variantLock}` : '')}
            images={MapImageFileNamesToSourceSet}
            slug={slug}
            Children={
              selectedVariant ? (
                <div className="flex flex-col font-medium -mt-2 p-4 pt-0">
                  <p className="mb-4 text-sm">
                    from{' '}
                    <span className="font-bold text-xl">
                      {intToPriceFormat(removeDiscount(selectedVariant))}
                    </span>
                  </p>
                  <BuyButton
                    name={name}
                    id={name}
                    url="https://www.futuresfinefurnitureandbedding.com/snipcart.json"
                    price={variants[0].price}
                    variants={variants}
                    value={selectedVariant.variantName}
                  >
                    Add&nbsp;to&nbsp;Cart
                  </BuyButton>
                </div>
              ) : (
                <Link to={slug} className="p-4">
                  <div className="bg-cream-200 hover:bg-cream-100 font-semibold inline-block leading-none px-3 py-2 rounded hover:shadow-md text-maroon-700 hover:text-maroon-500 text-sm w-full">
                    See more details
                  </div>
                </Link>
              )
            }
          />
        );
      }}
    />
  );
};

export const ProductVariant = ({ variantName, price, discount }) =>
  Object({ variantName, price, discount });

ProductTile.propTypes = {
  name: propTypes.string.isRequired,
  ProductImages: propTypes.arrayOf(propTypes.string),
  variants: propTypes.arrayOf(
    propTypes.shape({
      variantName: propTypes.string,
      price: propTypes.number,
      discount: propTypes.number,
    })
  ).isRequired,
  variantLock: propTypes.string,
  slug: propTypes.string.isRequired,
};
