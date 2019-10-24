import React from 'react';
import propTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { ProductTile } from './ProductTile';
import { BuyButton } from './Snipcart';
import CategoryTitle from './CategoryTile';
import { priceFormat } from '../helpers/index';

export const CommonFilters = {
  hideDisable: node => (node.common ? node.disable : true),
};

export const ProductSingleRender = ({
  name,
  images,
  variants,
  slug,
  variantLock,
  category,
}) => {
  let selectedVariant;
  const findMinValidVariant = (acumulator, current) => {
    /**
     * if has vaild price && (either has
     *  no accumilator
     *  or current is cheaper than accumulator
     * )
     */
    const bool_validCurrent = current.price && current.price > 0;
    const bool_NoAccumulatorOrCurrentLessThanAccumulator =
      !acumulator || current.price < acumulator.price;
    return bool_validCurrent && bool_NoAccumulatorOrCurrentLessThanAccumulator
      ? current
      : acumulator;
  };
  if (variantLock && variants) {
    selectedVariant = variants.find(variant => variant.name === variantLock);
  }
  if (!selectedVariant && variants) {
    selectedVariant = variants.reduce(findMinValidVariant, null);
  }
  return (
    <CategoryTitle
      name={name + (variantLock ? ` / ${variantLock}` : '')}
      hoverText={name}
      key={name + (variantLock ? `/${variantLock}` : '')}
      images={images}
      slug={slug}
      Children={
        selectedVariant ? (
          <div className="flex flex-col font-medium -mt-2 p-4 pt-0">
            <p className="mb-4 text-sm">
              from{' '}
              <span className="font-bold text-xl">
                {priceFormat.format(selectedVariant.price)}
              </span>
            </p>
            <BuyButton
              name={name}
              id={name}
              url="https://www.futuresfinefurnitureandbedding.com/snipcart.json"
              price={selectedVariant.price}
              variants={variants.map(variant => ({
                variantName: variant.name,
                price: variant.price * 100,
                discount: 0,
                disabled: variant.disable,
              }))}
              value={selectedVariant.name}
            >
              Add&nbsp;to&nbsp;Cart
            </BuyButton>
          </div>
        ) : null
      }
    />
  );
};

export const ProductGroupRender = ({ products, _heading, _footer }) => (
  <>
    <hr />
    {_heading ? (
      <h2 className="font-bold mb-4 mt-6 text-2xl text-maroon-600">
        {_heading}
      </h2>
    ) : null}
    <div className="flex flex-wrap -mx-2 w-full">
      {products.map(product => {
        const { name, images, variants, slug } = product;
        const categoryName = product.category
          ? product.category.name
          : 'undefined';
        return (
          <ProductSingleRender
            name={name}
            images={images}
            variants={variants}
            slug={`/sanity/category/${categoryName}/${slug}`.toLowerCase()}
            category={categoryName}
            variantLock
          />
        );
      })}
    </div>
  </>
);

export const Products = ({ filters, perPage, pageNum }) => {
  const data = useStaticQuery(graphql`
    {
      allSanityProduct {
        edges {
          node {
            _id
            name
            slug {
              current
            }
            category {
              _id
              name
              slug {
                current
              }
            }
            range {
              name
              slug {
                current
              }
              _id
            }
            keywords
            common {
              disable
            }
            variants {
              name
              price
              disable
            }
            images {
              image {
                asset {
                  fluid(maxWidth: 300) {
                    src
                    srcSet
                  }
                }
              }
            }
            description
            _id
          }
        }
      }
    }
  `);
  const allProducts = data.allSanityProduct.edges.map(({ node }) => ({
    name: node.name,
    id: node._id,
    slug: node && node.slug ? node.slug.current : '',
    disable: node.common ? node.common.disable : false,
    range: {
      name: node.range.name,
      slug: node.range.slug ? node.range.slug.current : '',
    },
    variants: node.variants,
    keywords: node.keywords,
    category: node.category,
    images: node.images
      ? node.images.map(({ image }) => (image ? image.asset.fluid : null))
      : [],
  }));
  const appliedFilters = allProducts.filter(node =>
    filters.map(filter => filter(node)).reduce((a, b) => a && b)
  );
  const limitToPage = appliedFilters.filter(
    (node, index) =>
      (pageNum - 1) * perPage <= index && index < pageNum * perPage
  );
  return limitToPage;
};
