import React, { useState } from 'react';
import styles from './product.module.css';
import { Link } from 'gatsby';
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
  const [input, setInput] = useState(
    //varients[0].varientName
    R.compose(
      R.prop('varientName'),
      R.ifElse(
        R.isNil,
        R.always(varients[0]),
        R.identity,
      ),
      R.find(
        input=>input.price && input.price > 0
      )
    )(varients)
  )
  return (
    <div style={{
      //border:'2px inset lightgray',
      padding:'5px',
      boxShadow:'4px 4px 15px -5px rgba(0,0,0,1)',
      borderRadius:'5px',
      textAlign:'center'
    }}>
        <h6>
          {`${name}${input?` \\ ${input}`:''}`}
        </h6>
      {
        varients.length > 1
        ?
          <>
            <label>Choose an Option:</label>
            <select style={{margin: '5px 5px', textAlign:'center'}} value={input} onChange={e => setInput(e.target.value)}>
              {varients.map(varient=><option value={varient.varientName}>{`${varient.varientName}`}</option>)}
            </select>
          </>
        : <></>
      }
      <br/>
      <br/>
      {
        R.compose(
          R.ifElse(
            R.compose(
              R.or(R.isNil,R.lte(R.__,0)),
              R.prop('price')
            ),
            input=>(
              <span style={{color:'red', fontSize:'0.8rem'}}>
              </span>
            ),
            R.ifElse(
              item=>item.discount && item.discount>0,
              item=><span>
                <h6 style={{color:'red',fontSize:'1rem', transform: 'rotate(-3deg)', textDecoration:'underline', margin: '0px'}}>
                  Special Offer
                </h6>
                <span style={{color:'red', textDecoration:'line-through', fontsize:'1rem'}}>RRP : {formatter.format(item.price / 100)}</span><br/>
                <span style={{color:'blue', fontsize:'2.5rem'}}>Now : {formatter.format((item.price-item.discount)/100)}</span>
              </span>,
              R.compose(
                input => <span>
                  Price: {input}
                </span>,
                formatter.format,
                R.divide(R.__,100),
                R.prop('price'),
              )
            )
            /*
            */
          ),
          R.find(R.propEq('varientName',input))
        )(varients)
      }
      <br/>
        {
          R.compose(
            R.ifElse(
              R.compose(
                R.isNil,
                R.prop('price')
              ),
              input=>(
                <p style={{margin:"4px"}}>
                  <span style={{color:'red', fontSize:'0.8rem'}}> 
                    *See us <Link to='/contact'>Instore or Call</Link><br/>
                    for Pricing and Availability
                  </span>
                </p>
              ),
              input=>(
                <p style={{margin:"4px"}}>
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
                  </BuyButton><br/>
                  <span style={{color:'red', fontSize:'0.8rem'}}>
                    *<Link to='/contact'>Contact us</Link> for Availability 
                  </span>
                </p>
              )
            ),
            R.find(R.propEq('varientName',input))
          )(varients)
        }
      <br/>
    </div>
  )
}

const BuyButton = ({
  name,
  id,
  image,
  url,
  //price,
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
    data-item-price={`{"AUD":${(varients[0].price-(varients[0].discount || 0)) / 100}}`}
    description={description}
    data-item-custom1-name={varients && varients.length > 1?'Option':''}
    data-item-custom1-options={
      /*
        varients && varients.length > 1
        ? varients.map(vari=>`${vari.varientName}[${vari.price-varients[0].price>=0?'+':''}${(vari.price-varients[0].price)/100}]`).join('|')
        : ''

      */
      R.compose(
        R.join('|'),
        R.map(
          vari=>`${vari.varientName}[${vari.price-(vari.discount || 0)-varients[0].price>=0?'+':''}${(vari.price-(vari.discount || 0)-varients[0].price)/100}]`
        ),
        R.filter(item=>item.price && item.price > 0),
      )(varients)
    }
      data-item-custom1-value={value}
  >
    {children}
  </button>
);

export default BuyButton;
