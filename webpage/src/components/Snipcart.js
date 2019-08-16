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
      R.prop('variantName'),
      R.ifElse(R.isNil, R.always(variants[0]), R.identity),
      R.find(input => input.price && input.price > 0)
    )(variants)
  );
  return (
    <div className="bg-white flex flex-col my-auto px-4 py-8 rounded-lg shadow-md hover:shadow-lg w-full">
      <div className="max-w-xs mx-auto w-full">
        <h6 className="font-bold mb-4 text-center text-sm tracking-wider uppercase">{`${name}${
          GetProductValue ? ` (${GetProductValue})` : ''
        }`}</h6>
        {variants.length > 1 ? (
          <div className="mb-4">
            <label htmlFor="pickVar">
              <span className="block font-bold mb-2 text-xs uppercase">
                Choose an Option:
              </span>
              <div className="inline-block relative w-full">
                <select
                  id="pickVar"
                  className="appearance-none bg-white block border border-gray-200 hover:border-gray-300 leading-tight focus:outline-none px-4 py-2 pr-8 rounded shadow focus:shadow-outline w-full"
                  value={GetProductValue}
                  onChange={e => SetProductValue(e.target.value)}
                >
                  {variants.map(variant => (
                    <option
                      value={variant.variantName}
                      key={variant.variantName}
                    >
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
            </label>
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
                        <span className="block font-bold mb-2 text-xs uppercase">
                          Price:{' '}
                        </span>
                        <span className="font-bold ml-1 text-maroon-700">
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
                            value => value.variantName === GetProductValue
                          )
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
                                className="font-bold block text-center text-maroon-700 hover:text-maroon-500 text-sm hover:underline"
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
    variants.find(vari => vari.variantName === value).disabled === true ||
    variantsFiltered.length === 0;

  return NotAvaliableFlag ? (
    <>
      <br />
      <NotAvaliable text="Option Not Avaliable" />
    </>
  ) : (
    <button
      type="button"
      className="snipcart-add-item bg-maroon-800 hover:bg-maroon-700 font-semibold inline-block leading-none px-3 py-2 rounded hover:shadow-md text-cream-200 text-sm"
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
              `${vari.variantName || 'default'}[${
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
