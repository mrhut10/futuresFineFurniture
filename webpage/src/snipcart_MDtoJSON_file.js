const R = require('ramda');

const positive = input => `${input >= 0 ? '+' : ''}${input}`;

exports.snipcartJson = ({ data }) => {
  const getEdges = R.path(['allMarkdownRemark', 'edges']);
  const filterVariants = variants =>
    variants
      ? variants
          .filter(vari => vari.price - (vari.discount || 0) > 0) // priceless
          .filter(vari => vari.disabled !== true)
      : [];

  const edgeToProduct = ({ node }) => ({
    name: node.frontmatter.title,
    disabled:
      node.frontmatter.disabled === true ||
      !filterVariants(node.frontmatter.variants) ||
      filterVariants(node.frontmatter.variants).length === 0,
    variants: filterVariants(node.frontmatter.variants) || [],
  });

  const productToSnipcartProductDefinition = ({ name, variants }) => ({
    name,
    id: name,
    price: {
      AUD:
        variants.length > 1
          ? variants[0].price / 100
          : (variants[0].price - (variants[0].discount || 0)) / 100,
    },
    URL: '/snipcart_md.json',
    customFields:
      variants.length > 1
        ? [
            {
              name: 'Option',
              options: variants
                .map(
                  ({ variantName, discount, price }, i, parentArray) =>
                    `${variantName || 'default'}[${positive(
                      (price - (discount || 0) - parentArray[0].price) / 100
                    )}]`
                )
                .join('|'),
              type: 'dropdown',
            },
          ]
        : [],
  });

  return getEdges(data)
    .map(edgeToProduct)
    .filter(product => product.disabled !== true)
    .map(productToSnipcartProductDefinition);
};
