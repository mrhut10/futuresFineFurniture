/**
 * @typedef {Object} 
 */

const R = require('ramda');

const positive = R.ifElse(R.gte(0), a => `+${a}`, R.identity);

const locateEdges = R.path(['data', 'allSanityProduct', 'edges']);

const edgeToProductDefinition = R.compose(
  R.zipObj(['id', 'name', 'variants']),
  R.juxt([
    R.path(['node', '_id']),
    R.path(['node', 'name']),
    R.path(['node', 'variants']),
  ])
);

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
const variantPricedPositive = R.compose(R.gt(0), applyDiscountToVariant);

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
    R.compose(R.objOf('AUD'), R.compose(R.always('hello'))),
    // customFields
  ])
);

exports.snipcartJson = R.compose(
  R.map(
    R.compose(ProductDefinitionToSnipcartDefinition, edgeToProductDefinition)
  ),
  // filter out any product that has no priced variants
  // R.filter(R.propSatisfies(R.any(variantPricedPositive), 'variants')),
  locateEdges
);
