const R = require('ramda');

const positive = input => `${input >= 0 ? '+' : ''}${input}`;

exports.snipcartJson = R.compose(
  R.map(
    R.compose(
      input => ({
        name: R.prop('title')(input),
        id: R.prop('title')(input),
        price: {
          AUD: R.compose(
            R.divide(R.__, 100),
            item => item.price - (item.discount || 0),
            R.path(['variants', 0])
          )(input),
        },
        url: '/snipcart.json',
        customFields: R.compose(
          R.ifElse(
            R.compose(
              R.gt(R.__, 1),
              R.length
            ),
            allvariants => [
              {
                name: 'Option',
                options: R.compose(
                  R.join('|'),
                  R.map(
                    vari =>
                      `${vari.variantName}[${positive(
                        (vari.price -
                          (vari.discount || 0) -
                          R.pathOr(0, ['0', 'price'])(allvariants)) /
                          100
                      )}]`
                  ),
                  R.filter(item => item.price && item.price > 0)
                )(allvariants),
                // allvariants.map().join('|'),
                type: 'dropdown',
              },
            ],
            R.always([])
          ),
          R.prop('variants')
        )(input),
      }),
      R.path(['node', 'frontmatter'])
    )
  ),
  R.path(['data', 'allMarkdownRemark', 'edges'])
);
