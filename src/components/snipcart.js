import React, { useState } from 'react';
import styles from './product.module.css';
import * as R from 'ramda'

const formatter = new Intl.NumberFormat(`en-AU`, {
  style: `currency`,
  currency: `AUD`,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: true,
})

export const BuyArea = ({
  name,
  id,
  image,
  url,
  description,
  varients
}) => {
  const [input, setInput] = useState(varients[0].varientName)
  return (
    <div>
        <h6>
          {`${name}${input?` \\ ${input}`:''}`}
        </h6>
      {
        varients.length > 1
        ?
          <>
            <label>Please Choose an Option:</label>
            <select style={{margin: '0px 0px'}} value={input} onChange={e => setInput(e.target.value)}>
              {varients.map(varient=><option value={varient.varientName}>{`${varient.varientName}`}</option>)}
            </select>
          </>
        : <></>
      }
      Price: {
        R.compose(
          formatter.format,
          R.divide(R.__,100),
          R.prop('price'),
          R.find(R.propEq('varientName',input))
        )(varients)
      }<br/>
      <BuyButton
        Style={{margin: '10px'}}
        name={name}
        id={name}
        url={url}
        price={varients[0].price}
        varients={varients}
        value={input}
      >
        Add To Cart
      </BuyButton>
      <br/>
    </div>
  )
}

const BuyButton = ({
  name,
  id,
  image,
  url,
  price,
  description,
  children,
  varients,
  value
}) => (
  <button
    type="button"
    className={`${styles.buyButton} snipcart-add-item`}
    data-item-name={name}
    data-item-id={id}
    data-item-image={image}
    data-item-url={url}
    data-item-price={`{"AUD":${price / 100}}`}
    description={description}
    data-item-custom1-name={varients && varients.length > 1?'Option':''}
    data-item-custom1-options={
      varients && varients.length > 1
      ? varients.map(vari=>`${vari.varientName}[${vari.price-varients[0].price>=0?'+':'-'}${(vari.price-varients[0].price)/100}]`).join('|')
      : ''
    }
      data-item-custom1-value={value}
  >
    {children}
  </button>
);

export default BuyButton;
