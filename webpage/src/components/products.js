import React from 'react';
import propTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { ProductTile } from './ProductTile';
import { BuyButton } from './Snipcart';
import CategoryTitle from './CategoryTile';
import { priceFormat } from '../helpers/index';

export const CommonFilters = {
  hideDisable: node => (node.common ? node.common.disable : true),
};

export const applyDiscountToPrice = (price, discount) => {
  let output = price;
  if (discount && discount.method && discount.method === 'percentage'){
    output *= 1 - discount.amount;
  } else if (discount && discount.method && discount.method === 'amount'){
    output -= discount.amount;
  }
  return output;
};

export const ProductSingleRender = ({
  name,
  images,
  variants,
  slug,
  variantLock,
  category,
  discount
}) => {
  let selectedVariant;
  const findMinValidVariant = (acumulator, current) => {
    /**
     * if has vaild price && (either has
     *  no accumilator
     *  or current is cheaper than accumulator
     * )
     */
    const bool_validCurrent =
      applyDiscountToPrice(current.price, discount) &&
      applyDiscountToPrice(current.price) > 0;
    const bool_NoAccumulatorOrCurrentLessThanAccumulator =
      !acumulator ||
      applyDiscountToPrice(current.price, discount) <
        applyDiscountToPrice(acumulator.price, discount);
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
              {discount.amount && discount.amount > 0 ? (
                <>
                  <span className="text-red-500 line-through">WAS {priceFormat.format(selectedVariant.price)}</span><br />
                  <span className="text-blue-500">NOW from {priceFormat.format(applyDiscountToPrice(selectedVariant.price, discount))}</span>
                </>
              ) : (
                <>
                  from{' '}
                  <span className="font-bold text-xl">
                    {priceFormat.format(
                      applyDiscountToPrice(selectedVariant.price, discount)
                    )}
                  </span>
                </>
              )}
            </p>
            <BuyButton
              name={name}
              id={name}
              url="https://www.futuresfinefurnitureandbedding.com/snipcart.json"
              price={selectedVariant.price}
              variants={variants.map(variant => ({
                variantName: variant.name,
                price: variant.price * 100,
                discount:
                  (variant.price -
                    applyDiscountToPrice(variant.price, discount)) *
                  100,
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
    <div className="flex flex-wrap  ` -mx-2 w-full">
      {products.map(product => {
        const { name, images, variants, slug, discount } = product;
        const categoryName = product.category
          ? product.category.name
          : 'undefined';
        return (
          <ProductSingleRender
            name={name}
            key={name}
            images={images}
            variants={variants}
            slug={`/sanity/category/${categoryName}/${slug}`.toLowerCase()}
            category={categoryName}
            variantLock
            discount={discount}
          />
        );
      })}
    </div>
  </>
);

export const Products = ({ filters, perPage, pageNum, scales, sorters }) => {
  const data = useStaticQuery(graphql`
    {
      allSanityProductDiscount {
        edges {
          node {
            _rawTarget
            method
            amount
          }
        }
      }
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
    ranges: node.range.map(range => ({
      name: range.name,
      slug: range.slug ? range.slug.current : '',
      id: range._id,
    })),
    variants: node.variants,
    keywords: node.keywords,
    category: node.category,
    images: node.images
      ? node.images.map(({ image }) => (image ? image.asset.fluid : null))
      : [],
    description: node.description,
    discount: data.allSanityProductDiscount.edges
      .map(discount => {
        // const _ref, method, amount = JSON.parse(discount.node);
        const { method, amount } = discount.node;
        const { _ref } = discount.node._rawTarget;
        return { _ref, method, amount };
      })
      .filter(
        // only show discounts that are relivant to this product / range / category
        ({ _ref }) =>
          _ref === node._id ||
          _ref === node.range.some(range => range._id) ||
          _ref === node.category._id
      )
      .reduce(
        // only apply the lastest discount, but percentage discounts will trump amount discounts
        (a, b, index, items) => {
          let output = a;
          if (a.method === b.method){
            output = a.amount > b.amount ? a : b;
          } else if (a.method === 'percentage'){
            output = a;
          } else if (b.method === 'percentage'){
            output = b;
          }
          return output;
        },
        { method: 'amount', amount: 0 }
      ),
  }));
  const appliedFilters = allProducts.filter(node =>
    filters.map(filter => filter(node)).reduce((a, b) => a && b)
  );
  const appliedWeight = appliedFilters.map(node => {
    node.weight = scales
      ? scales.map(scale => scale(node)).reduce((a, b) => a + b, 0)
      : 0;
    return node;
  });
  // sort according too sorters
  if (sorters) {
    sorters.forEach(sorter => {
      appliedWeight.sort(sorter);
    });
  }
  const limitToPage = appliedWeight.filter(
    (node, index) =>
      (pageNum - 1) * perPage <= index && index < pageNum * perPage
  );
  return limitToPage;
};
