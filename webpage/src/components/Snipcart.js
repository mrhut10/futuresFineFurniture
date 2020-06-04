import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'gatsby';
import * as R from 'ramda';
import NotAvaliable from './NotAvaliable';

import { intToPriceFormat } from '../helpers';

export const BuyArea = ({ name, url, variants, disabled }) => {
  const [GetProductValue, SetProductValue] = useState(
    // variants[0].variantName
    R.compose(
      item => item.variantName || item.name,
      R.ifElse(R.isNil, R.always(variants[0]), R.identity),
      R.find(input => input.price && input.price > 0)
    )(variants)
  );
  return (
    <div className="flex flex-col w-full px-4 py-8 my-auto bg-white rounded-lg shadow-md hover:shadow-lg">
      <div className="w-full max-w-xs mx-auto">
        <h6 className="mb-4 text-sm font-bold tracking-wider text-center uppercase">{`${name}${
          GetProductValue ? ` (${GetProductValue})` : ''
        }`}</h6>
        {variants.length > 1 ? (
          <div className="mb-4">
            <label htmlFor="pickVar">
              <span className="block mb-2 text-xs font-bold uppercase">
                Choose an Option:
              </span>
              <div className="relative inline-block w-full">
                <select
                  id="pickVar"
                  className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-200 rounded shadow appearance-none hover:border-gray-300 focus:outline-none focus:shadow-outline"
                  value={GetProductValue}
                  onChange={e => SetProductValue(e.target.value)}
                >
                  {variants.map(variant => (
                    <option
                      value={variant.variantName || variant.name}
                      key={variant.variantName || variant.name}
                    >
                      {variant.variantName || variant.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                  <svg
                    className="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </label>
          </div>
        ) : (
          <></>
        )}
        {R.compose(
          R.ifElse(
            R.compose(R.or(R.isNil, R.lte(R.__, 0)), R.prop('price')),
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
                      className="relative m-0 text-base font-bold text-red"
                    >
                      Special Offer
                    </h6>
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-gray-600 line-through font-base">
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
                        disabled={disabled}
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
                    <div className="flex items-baseline justify-between mb-6">
                      <div className="flex items-baseline">
                        <span className="block mb-2 text-xs font-bold uppercase">
                          Price:{' '}
                        </span>
                        <span className="ml-1 font-bold text-maroon-700">
                          {input}
                        </span>
                      </div>
                      <div>
                        <BuyButton
                          Style={{ margin: '10px' }}
                          name={name}
                          id={name}
                          url={url}
                          price={variants[0].price}
                          variants={variants}
                          value={GetProductValue}
                          disabled={disabled}
                        >
                          Add To Cart
                        </BuyButton>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <p>
                        {variants
                          .filter(
                            value =>
                              value.variantName ||
                              value.name === GetProductValue
                          )
                          .map(value =>
                            value.qty && value.qty > 0 ? (
                              <span
                                className="text-red-600"
                                key={value.variantName || value.name}
                              >
                                {value.qty > 10
                                  ? `In Store: 10 or more units available`
                                  : `In Store: ${value.qty} units available`}
                              </span>
                            ) : (
                              <Link
                                className="block text-sm font-bold text-center text-maroon-700 hover:text-maroon-500 hover:underline"
                                to="/contact"
                                key={value.variantName || value.name}
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
          R.find(
            item =>
              item.variantName === GetProductValue ||
              item.name === GetProductValue
          )
        )(variants)}
        {R.compose(
          R.ifElse(
            R.compose(R.isNil, R.prop('price')),
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
          R.find(item => item.variantName || item.name === GetProductValue)
        )(variants)}
      </div>
    </div>
  );
};

export const BuyButton = ({
  name,
  id,
  image,
  url,
  description,
  children,
  disabled,
  variants,
  value,
}) => {
  const variantsFiltered = variants
    // filter out disabled variants
    .filter(item => item.disabled !== true)
    // filter out priceless variants
    .filter(item => item.price && item.price - (item.discount || 0) > 0);

  const NotAvaliableFlag =
    disabled ||
    variants.find(vari => vari.variantName === value || vari.name === value)
      .disabled === true ||
    variantsFiltered.length === 0;

  return NotAvaliableFlag ? (
    <>
      <br />
      <NotAvaliable text="Option Not Avaliable" />
    </>
  ) : (
    <button
      type="button"
      className="inline-block px-3 py-2 text-sm font-semibold leading-none rounded snipcart-add-item bg-maroon-800 hover:bg-maroon-700 hover:shadow-md text-cream-200"
      data-item-name={name}
      data-item-id={id}
      data-item-image={image}
      data-item-url={url}
      data-item-price={`{"AUD":${
        (variantsFiltered.length > 1
          ? variantsFiltered[0].price // APPLY DISCOUNT ONLY IN OPTIONS
          : variantsFiltered[0].price - (variantsFiltered[0].discount || 0)) / // APPLY DISCOUNT AS NO OPTIONS
          100 // DIVIDE BY 100
      }}`}
      description={description}
      data-item-custom1-name={variants && variants.length > 1 ? 'Option' : ''}
      data-item-custom1-options={(variantsFiltered.length <= 1
        ? [] // ONE OR LESS OPTIONS, SO DISPLAY NO OPTIONS
        : variantsFiltered.map(
            (vari, index, parrentArray) =>
              `${vari.variantName || vari.name || 'default'}[${
                vari.price - (vari.discount || 0) - parrentArray[0].price >= 0
                  ? '+' // specify is positive number
                  : '' // will automatically have a negative sign
              }${(vari.price - (vari.discount || 0) - parrentArray[0].price) /
                100}]`
          )
      ).join('|')}
      data-item-custom1-value={value}
    >
      {children}
    </button>
  );
};

BuyArea.propTypes = {
  name: propTypes.string,
  url: propTypes.string,
  variants: propTypes.any,
  disabled: propTypes.bool,
};
BuyButton.propTypes = {
  name: propTypes.string,
  id: propTypes.string,
  image: propTypes.any,
  url: propTypes.string,
  disabled: propTypes.bool,
  description: propTypes.string,
  children: propTypes.any, // arrayOf(propTypes.element),
  variants: propTypes.array,
  value: propTypes.string,
};

export default BuyButton;
