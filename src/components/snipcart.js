import React, { useState } from 'react';
import { Link } from 'gatsby';
import * as R from 'ramda';
// import styles from './product.module.css';

const formatter = new Intl.NumberFormat(`en-AU`, {
  style: `currency`,
  currency: `AUD`,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: true,
});

export const BuyArea = ({ name, id, image, url, description, varients }) => {
  const [GetProductValue, SetProductValue] = useState(
    // varients[0].varientName
    R.compose(
      R.prop('varientName'),
      R.ifElse(R.isNil, R.always(varients[0]), R.identity),
      R.find(input => input.price && input.price > 0)
    )(varients)
  );
  return (
    <div className="flex flex-col">
      <h6>{`${name}${GetProductValue ? ` \/ ${GetProductValue}` : ''}`}</h6>
      {varients.length > 1 ? (
        <div className="flex items-center justify-between mb-4">
          <label>Choose an Option: </label>
          <div className="inline-block relative w-64">
            <select
              className="appearance-none bg-white block border border-grey-light hover:border-grey leading-tight focus:outline-none px-4 py-2 pr-8 rounded shadow focus:shadow-outline w-full"
              // style={{ margin: '5px 5px', textAlign: 'center' }}
              value={GetProductValue}
              onChange={e => SetProductValue(e.target.value)}
            >
              {varients.map(varient => (
                <option value={varient.varientName} key={varient.varientName}>
                  {varient.varientName}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
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
          input => <span style={{ color: 'red', fontSize: '0.8rem' }} />,
          R.ifElse(
            item => item.discount && item.discount > 0,
            item => (
              <span>
                <h6
                  style={{
                    color: 'red',
                    fontSize: '1rem',
                    transform: 'rotate(-3deg)',
                    textDecoration: 'underline',
                    margin: '0px',
                  }}
                >
                  Special Offer
                </h6>
                <span
                  style={{
                    color: 'red',
                    textDecoration: 'line-through',
                    fontsize: '1rem',
                  }}
                >
                  RRP : {formatter.format(item.price / 100)}
                </span>
                <br />
                <span style={{ color: 'blue', fontsize: '2.5rem' }}>
                  Now : {formatter.format((item.price - item.discount) / 100)}
                </span>
              </span>
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
                      price={varients[0].price}
                      varients={varients}
                      value={GetProductValue}
                    >
                      Add To Cart
                    </BuyButton>
                  </div>
                  <div>
                    <p className="text-center">
                      {varients
                        .filter(value => value.varientName === GetProductValue)
                        .map(value =>
                          value.qty && value.qty > 0 ? (
                            <span className="text-red-dark">
                              {value.qty > 10
                                ? `In Store: 10 or more units available`
                                : `In Store: ${value.qty} units available`}
                            </span>
                          ) : (
                            <Link
                              className="text-blue-dark hover:underline"
                              to="/contact"
                            >
                              *Contact us for availability
                            </Link>
                          )
                        )}
                    </p>
                  </div>
                </>
              ),
              formatter.format,
              R.divide(R.__, 100),
              R.prop('price')
            )
          )
        ),
        R.find(R.propEq('varientName', GetProductValue))
      )(varients)}
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
          input => ''
        ),
        R.find(R.propEq('varientName', GetProductValue))
      )(varients)}
    </div>
  );
};

const BuyButton = ({
  name,
  id,
  image,
  url,
  // price,
  description,
  children,
  varients,
  value,
}) => (
  <button
    type="button"
    className="snipcart-add-item bg-maroon font-semibold p-2 rounded text-cream"
    data-item-name={name}
    data-item-id={id}
    data-item-image={image}
    data-item-url={url}
    data-item-price={`{"AUD":${(varients[0].price -
      (varients[0].discount || 0)) /
      100}}`}
    description={description}
    data-item-custom1-name={varients && varients.length > 1 ? 'Option' : ''}
    data-item-custom1-options={
      /*
        varients && varients.length > 1
        ? varients.map(vari=>`${vari.varientName}[${vari.price-varients[0].price>=0?'+':''}${(vari.price-varients[0].price)/100}]`).join('|')
        : ''

      */
      R.compose(
        R.join('|'),
        R.map(
          vari =>
            `${vari.varientName}[${
              vari.price - (vari.discount || 0) - varients[0].price >= 0
                ? '+'
                : ''
            }${(vari.price - (vari.discount || 0) - varients[0].price) / 100}]`
        ),
        R.filter(item => item.price && item.price > 0)
      )(varients)
    }
    data-item-custom1-value={value}
  >
    {children}
  </button>
);

export default BuyButton;
