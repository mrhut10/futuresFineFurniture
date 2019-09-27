/**
 * @typedef {Object} productVariantInterface
 * @property {String} variantName
 * @property {Boolean} disabled
 *
 * @typedef {Object} productInterface
 * @property {String} name
 * @property {String} slug
 * @property {String} category
 * @property {String} range
 * @property {productVariantInterface} variants
 * @property {Boolean} disabled
 *
 * @typedef {Object} sanityReferenceInterface
 * @property {String} _type
 * @property {String} _ref
 *
 * @typedef {Object} sanitySlugInterface
 * @property {String} _type
 * @property {String} current
 *
 * @typedef {Object} sanityProductVarientInterface
 * @property {String} _type
 * @property {String} name
 * @property {Number} price
 *
 * @typedef {Object} sanityProductInterface
 * @property {String} _type
 * @property {sanityReferenceInterface} category
 * @property {String} description
 * @property {String} name
 * @property {String} slug
 * @property {Array<sanityProductVarientInterface>} variants
 *
 */

const categories = [
  { name: 'bedroom', id: '08fe1255-9f1f-489c-bcd3-44d05e346f37' },
  { name: 'lounges', id: '86872e69-47b0-4e52-9127-dea14c356648' },
  { name: 'living', id: '8e4fb897-9e57-47c1-a55d-c94bd3524db8' },
  { name: 'dining', id: '3d758cf6-c16f-48c9-a676-d49515bf14e9' },
  { name: 'mattress', id: 'e0aa4d13-047e-4167-b6e0-b57bb3121414' },
  { name: 'mobility', id: 'bda95f5e-4b5a-4659-9451-9c3dab39eeae' },
  { name: 'outdoor', id: '07adee34-313d-48ea-8115-97e5541c5ee5' },
];

/** @type {a} @param {Array<a>}[a] */
const last = a => a[a.length - 1];

/** @type {String} @param {String}[categoryName] */
const categoryNameToRefNumber = categoryName =>
  categories.find(a => {
    console.log({"name":categoryName});
    a.name.trim().toLowerCase() === categoryName.toLowerCase()
  });

/** @type {string} @param {String}[oldSlug] */
const oldSlugToNewSlug = oldslug => last(oldslug.split('/'));

/** @type {sanityProductVarientInterface} @param {productVariantInterface}[productVariant] */
const productVariantToSanityProductVariant = productVariant => {
  /** @type {sanityProductVarientInterface} */
  const output = {
    _type: 'productvariant',
    name: productVariant.variantName,
    price: productVariant.price / 100,
  };
  return output;
};

/** @type {Array<sanityProductInterface>} @param {Array<productInterface>}[products] */
exports.productArrayToSanityArray = products =>
  products.map(exports.productToSanityProduct);

/** @type {String} @param {Array<productInterface>}[products] */
exports.productArrayToSanityDump = products =>
  exports
    .productArrayToSanityArray(products)
    .map(JSON.stringify)
    .join('\n');

/** @type {sanityProductInterface} @param {productInterface}[product] */
exports.productToSanityProduct = product => {
  /** @type {sanityProductInterface} */
  const outputProduct = {
    _type: 'product',
    category: {
      _type: 'reference',
      _ref: categoryNameToRefNumber(product.category),
    },
    description: product.description,
    name: product.name,
    slug: {
      _type: 'slug',
      current: oldSlugToNewSlug(product.slug),
    },
    variants: product.variants.map(productVariantToSanityProductVariant),
  };
  return outputProduct;
};
