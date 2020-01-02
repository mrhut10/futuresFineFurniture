import * as R from 'ramda';
import {
  activeVariant,
  applyDiscountToVariant,
  variantlistToSnipcartOptionsString,
} from '../helpers/snipcart_sanityToJSON';
import NotAvaliable from './NotAvaliable';

export const NewBuyButton = (name, id, variants, disabled, value, children) => {
  const validVarients = R.filter(activeVariant)(variants);
  const avaliableFlag = disabled !== true && validVarients.length > 0;

  return avaliableFlag ? (
    <button
      type="button"
      className="snipcart-add-item bg-maroon-800 hover:bg-maroon-700 font-semibold inline-block leading-none px-3 py-2 rounded hover:shadow-md text-cream-200 text-sm"
      data-item-name={name}
      data-item-id={id}
      data-item-url="/snipcart.json"
      data-item-price={R.compose(
        R.objOf('AUD'),
        applyDiscountToVariant,
        R.head
      )(validVarients)}
      data-item-custom1-name='Option'
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
      <NotAvaliable text="Option Not Avaliable" />
    </>
  )
}