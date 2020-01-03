import React, { useState } from 'react';
import * as R from 'ramda';
import {
  activeVariant,
  applyDiscountToVariant,
  variantlistToSnipcartOptionsString,
} from '../helpers/snipcart_sanityToJSON';
import NotAvaliable from './NotAvaliable';
import { priceFormat } from '../helpers';

export const NewBuyArea = ({ name, id, disable, url, variants }) => {
  const [GetProductValue, SetProductValue] = R.compose(
    useState,
    R.prop('name'),
    R.ifElse(
      // first priced found
      R.head,
      R.head,
      R.last
    ),
    R.juxt([
      // first priced
      R.find(variant => applyDiscountToVariant(variant) > 0),
      // all
      R.identity,
    ])
  )(variants);
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
                      value={variant.name || 'default'}
                      key={variant.name || 'default'}
                    >
                      {variant.name}
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
              R.gt(R.__, 0),
              applyDiscountToVariant,
              R.prop('selectedItem')
            ),
            // selected Item priced
            R.compose(
              item => (
                <div>
                  {item.price - applyDiscountToVariant(item) > 0.01 ? (
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
                        <>
                          <div className="font-base line-through text-gray-600">
                            RRP : {priceFormat.format(item.price)}
                          </div>
                          <div>
                            Now :{' '}
                            {priceFormat.format(applyDiscountToVariant(item))}
                          </div>
                        </>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-baseline justify-between mb-6">
                      <div className="flex items-baseline">
                        <span className="block font-bold mb-2 text-xs uppercase">
                          Price:{' '}
                        </span>
                        <span className="font-bold ml-1 text-maroon-700">
                          {priceFormat.format(applyDiscountToVariant(item))}
                        </span>
                      </div>
                    </div>
                  )}
                  {disable ? (
                    <NotAvaliable text="Not Currently Avaliable" />
                  ) : (
                    <NewBuyButton
                      Style={{ margin: '10px' }}
                      name={name}
                      id={id}
                      url={url}
                      variants={variants}
                      value={GetProductValue}
                      disable={false}
                    >
                      Add To Cart
                    </NewBuyButton>
                  )}
                </div>
              ),
              R.prop('selectedItem')
            ),
            // selected Item not priced
            () => (
              <span style={{ color: 'red', fontSize: '0.8rem' }}>
                See In-store
              </span>
            )
          ),
          R.zipObj(['selectedItem', 'allItems']),
          R.juxt([R.find(R.propEq('name', GetProductValue)), R.identity])
        )(variants)}
      </div>
    </div>
  );
};

export const NewBuyButton = ({
  name,
  id,
  variants,
  disable,
  value,
  children,
}) => {
  const validVarients = variants ? variants.filter(activeVariant) : [];
  const avaliableFlag =
    disable !== true &&
    validVarients.length > 0 &&
    validVarients.find(item => item.name === value) &&
    validVarients.find(item => item.name === value).disable !== true;
  return avaliableFlag ? (
    <button
      type="button"
      className="snipcart-add-item bg-maroon-800 hover:bg-maroon-700 font-semibold inline-block leading-none px-3 py-2 rounded hover:shadow-md text-cream-200 text-sm"
      data-item-name={name}
      data-item-id={id}
      data-item-url="https://www.futuresfinefurnitureandbedding.com/snipcart.json"
      data-item-price={R.compose(
        item => `{"AUD":"${item}"}`,
        applyDiscountToVariant,
        R.head
      )(validVarients)}
      data-item-custom1-name={validVarients.length === 1 ? '' : 'Option'}
      data-item-custom1-options={variantlistToSnipcartOptionsString(
        validVarients
      )}
      data-item-custom1-value={value}
    >
      {children}
    </button>
  ) : (
    <>
      <br />
      <NotAvaliable text="See in-store for avaliability" />
    </>
  );
};
