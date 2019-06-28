import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'gatsby';
import * as R from 'ramda';
import { intToPriceFormat } from '../helpers/index';

export const BuyArea = ({ name, url, variants }) => {
  const [GetProductValue, SetProductValue] = useState(
    // variants[0].variantName
    R.compose(
      R.prop('variantName'),
      R.ifElse(R.isNil, R.always(variants[0]), R.identity),
      R.find(input => input.price && input.price > 0)
    )(variants)
  );
  return (
    <div className="flex flex-col">
      <h6>{`${name}${GetProductValue ? ` (${GetProductValue})` : ''}`}</h6>
      {variants.length > 1 ? (
        <div className="flex items-center justify-between mb-4">
          <label htmlFor="pickVar">
            <input />
            Choose an Option:{' '}
          </label>
          <div className="inline-block relative w-64">
            <select
              id="pickVar"
              className="appearance-none bg-white block border border-gray-400 hover:border-gray-500 leading-tight focus:outline-none px-4 py-2 pr-8 rounded shadow focus:shadow-outline w-full"
              // style={{ margin: '5px 5px', textAlign: 'center' }}
              value={GetProductValue}
              onChange={e => SetProductValue(e.target.value)}
            >
              {variants.map(variant => (
                <option value={variant.variantName} key={variant.variantName}>
                  {variant.variantName}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {R.compose(
        R.ifElse(
          R.compose(
            R.or(R.isNil, R.lte(R.__, 0)),
            R.prop('price')
          ),
          () => <span style={{ color: 'red', fontSize: '0.8rem' }} />,
          R.ifElse(
            item => item.discount && item.discount > 0,
            item => (
              <>
                <div>
                  <h6
                    style={{
                      transform: `rotate(-3deg)`,
                    }}
                    className="font-bold m-0 relative text-red text-base"
                  >
                    Special Offer
                  </h6>
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="font-base line-through text-gray-600">
                        RRP : {intToPriceFormat(item.price)}
                      </span>
                      <br />
                      <span>
                        Now : {intToPriceFormat(item.price - item.discount)}
                      </span>
                    </div>
                    <BuyButton
                      Style={{ margin: '10px' }}
                      name={name}
                      id={name}
                      url={url}
                      price={variants[0].price}
                      variants={variants}
                      value={GetProductValue}
                    >
                      Add To Cart
                    </BuyButton>
                  </div>
                </div>
              </>
            ),
            R.compose(
              input => (
                <>
                  <div className="flex items-baseline justify-between mb-4">
                    <span>Price: {input}</span>
                    <BuyButton
                      Style={{ margin: '10px' }}
                      name={name}
                      id={name}
                      url={url}
                      price={variants[0].price}
                      variants={variants}
                      value={GetProductValue}
                    >
                      Add To Cart
                    </BuyButton>
                  </div>
                  <div>
                    <p className="text-center">
                      {variants
                        .filter(value => value.variantName === GetProductValue)
                        .map(value =>
                          value.qty && value.qty > 0 ? (
                            <span
                              className="text-red-600"
                              key={value.variantName}
                            >
                              {value.qty > 10
                                ? `In Store: 10 or more units available`
                                : `In Store: ${value.qty} units available`}
                            </span>
                          ) : (
                            <Link
                              className="text-blue-600 hover:underline"
                              to="/contact"
                              key={value.variantName}
                            >
                              *Contact us for availability
                            </Link>
                          )
                        )}
                    </p>
                  </div>
                </>
              ),
              intToPriceFormat,
              R.prop('price')
            )
          )
        ),
        R.find(R.propEq('variantName', GetProductValue))
      )(variants)}
      {R.compose(
        R.ifElse(
          R.compose(
            R.isNil,
            R.prop('price')
          ),
          () => (
            <p style={{ margin: '4px' }}>
              <span style={{ color: 'red', fontSize: '0.8rem' }}>
                *See us <Link to="/contact">Instore or Call</Link>
                <br />
                for Pricing and Availability
              </span>
            </p>
          ),
          () => ''
        ),
        R.find(R.propEq('variantName', GetProductValue))
      )(variants)}
    </div>
  );
};

export const BuyButton = ({
  name,
  id,
  image,
  url,
  // price,
  description,
  children,
  variants,
  value,
}) => (
  <button
    type="button"
    className="snipcart-add-item bg-maroon-800 font-semibold inline-block p-2 rounded text-cream-200"
    data-item-name={name}
    data-item-id={id}
    data-item-image={image}
    data-item-url={url}
    data-item-price={`{"AUD":${(variants[0].price -
      (variants[0].discount || 0)) /
      100}}`}
    description={description}
    data-item-custom1-name={variants && variants.length > 1 ? 'Option' : ''}
    data-item-custom1-options={
      /*
        variants && variants.length > 1
        ? variants.map(vari=>`${vari.variantName}[${vari.price-variants[0].price>=0?'+':''}${(vari.price-variants[0].price)/100}]`).join('|')
        : ''

      */
      R.compose(
        R.join('|'),
        R.map(
          vari =>
            `${vari.variantName}[${
              vari.price - (vari.discount || 0) - variants[0].price >= 0
                ? '+'
                : ''
            }${(vari.price - (vari.discount || 0) - variants[0].price) / 100}]`
        ),
        R.filter(item => item.price && item.price > 0)
      )(variants)
    }
    data-item-custom1-value={value}
  >
    {children}
  </button>
);

BuyArea.propTypes = {
  name: propTypes.string,
  id: propTypes.string,
  image: propTypes.string,
  url: propTypes.string,
  description: propTypes.string,
  variants: propTypes.any,
};
BuyButton.propTypes = {
  name: propTypes.string,
  id: propTypes.string,
  image: propTypes.any,
  url: propTypes.string,
  description: propTypes.string,
  children: propTypes.any, // arrayOf(propTypes.element),
  variants: propTypes.array,
  value: propTypes.string,
};

export default BuyButton;
