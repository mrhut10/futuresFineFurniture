import React from "react"
import styles from './product.module.css'


const BuyButton = ({ name, id, image, url, price, description, children, offline }) => {

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
    >
      {children}
    </button>
  )
}

export default BuyButton