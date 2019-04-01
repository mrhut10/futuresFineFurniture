import React, { useState } from "react"
import styles from './product.module.css'
import * as R from 'ramda'

const formatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: true,
})
// : ${formatter.format(varient.price/100)}`
export const BuyArea = ({name,id,image,url,description,varients}) => {
  const [input, setInput] = useState(varients[0].varientName)
  return (
    <div>
      {
        varients.length > 1
        ?
          <>
            <label>Please Make a Selection: </label>
            <select style={{margin: '10px 0px'}} value={input} onChange={e => setInput(e.target.value)}>
              {varients.map(varient=><option value={varient.varientName}>{`${varient.varientName}`}</option>)}
            </select><br/>
          </>
        : <></>
      }
      Selection: {input||name}<br/>
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
      <br/>
      <br/>
      
    </div>
  )
}
export const BuyButton = ({ name, id, image, url, price, description, children, varients, value}) => {
  const headPrice = R.compose(R.prop('price'),R.head)
  return (
    <button
      type="button"
      className={`${styles.buyButton} snipcart-add-item`}
      data-item-name={name}
      data-item-id={id}
      data-item-image={image}
      data-item-url={url}
      data-item-price={`{"AUD":${price / 100}}`}
      description={description}
      data-item-custom1-name='Option'
      data-item-custom1-options={
        varients && varients.length > 1
        ? varients.map(vari=>`${vari.varientName}[${vari.price-varients[0].price>=0?'+':'-'}${(vari.price-varients[0].price)/100}]`).join('|')
        : ''
      }
      data-item-custom1-value={value}
    >
      {children}
    </button>
  )
}


