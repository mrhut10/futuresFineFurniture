/**
 * @typedef {Object} 
 */

const R = require('ramda');

const positive = R.ifElse(R.gte(0), a => `+${a}`, R.identity);
const mapIndexed = R.addIndex(R.map);

const applyDiscountToVariant = variant => {
  const rrp = variant.price || 0;
  let price = rrp;
  if ((variant.discount_method || 'percentage') === 'percentage') {
    price *= 1 - (variant.discount_amount || 0);
  } else {
    price -= variant.discount_amount || 0;
  }
  return price;
};

const activeVariant = variant =>
  variant.disable !== true && applyDiscountToVariant(variant) > 0;

const locateEdges = R.path(['data', 'allSanityProduct', 'edges']);

const edgeToProductDefinition = R.compose(
  R.zipObj(['id', 'name', 'variants']),
  R.juxt([
    R.path(['node', '_id']),
    R.path(['node', 'name']),
    R.path(['node', 'variants']),
  ])
);

const ProductDefinitionToSnipcartDefinition = R.compose(
  R.zipObj(['id', 'name', 'url', 'price', 'customFields']),
  R.juxt([
    // id
    R.prop('id'),
    // name
    R.prop('name'),
    // url
    R.always('/snipcart.json'),
    // price
    R.compose(
      R.objOf('AUD'),
      applyDiscountToVariant,
      R.head,
      R.filter(activeVariant),
      R.prop('variants')
    ),
    // customFields
    R.compose(
      R.compose(
        R.join('|'),
        mapIndexed(
          (item, index, list) =>
            `${item.name || 'default'}[${positive(
              applyDiscountToVariant(item) - applyDiscountToVariant(list[0])
            )}]`
        ),
        R.filter(activeVariant),
        R.prop('variants')
      )
    ),
  ])
);



exports.snipcartJson = R.compose(
  R.map(
    R.compose(
      ProductDefinitionToSnipcartDefinition,
      edgeToProductDefinition
    )
  ),
  // remove products with no active variants
  R.filter(R.compose(R.any(activeVariant), R.pathOr([], ['node', 'variants']))),
  // remove disabled products
  R.filter(R.complement(R.pathEq(['node', 'disable'], true))),
  locateEdges
);
