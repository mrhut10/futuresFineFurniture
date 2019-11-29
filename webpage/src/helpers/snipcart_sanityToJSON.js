const positive = input => `${input >= 0 ? '+' : ''}${input}`;

const applyDiscount = ({
  price = 0,
  discount_method = 'amount',
  discount_amount = 0,
}) => {
  let discountValue = 0;
  if (price && price > 0) {
    if (discount_method === 'percentage' && discount_amount >= 0) {
      discountValue = ((price * discount_amount) / 100).toFixed(2);
    } else if (discount_method === 'amount' && discount_amount >= 0) {
      discountValue = discount_amount.toFixed(2);
    }
    return price > discountValue ? price - discountValue : 0;
  }
  return 0;
};

exports.snipcartJson = ({ data }) => {
  const { edges } = data.allSanityProduct;
  return edges.map(({ node }) => {
    const validVariants = node.variants
      ? node.variants.filter(
          variant => !variant.disable && applyDiscount(variant) > 0
        )
      : null;
    return !validVariants || validVariants.length <= 0
      ? null
      : {
          id: node._id,
          name: node.name,
          price: {
            AUD:
              validVariants.length === 1
                ? applyDiscount(validVariants[0])
                : validVariants[0].price,
          },
          URL: '/snipcart.json',
          customFields:
            validVariants.length > 1
              ? [
                  {
                    name: 'Option',
                    options: validVariants
                      .map(
                        (
                          { name, price, discount_method, discount_amount },
                          i,
                          parray
                        ) =>
                          `${name || 'default'}[${positive(
                            applyDiscount({
                              price,
                              discount_method,
                              discount_amount,
                            }) - applyDiscount(parray[0])
                          )}]`
                      )
                      .join('|'),
                    type: 'dropdown',
                  },
                ]
              : [],
        };
  });
};
