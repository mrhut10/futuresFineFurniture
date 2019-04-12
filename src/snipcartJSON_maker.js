const R = require('ramda')

exports.snipcart_json = R.compose(
  R.map(R.compose(
    (input) => {
      return {
        name: R.prop('title')(input),
        id: R.prop('title')(input),
        price:{
          AUD:R.compose(
            R.divide(R.__,100),
            R.path(['variants',0,'price']
          ))(input),
        },
        url:'/snipcart.json',
        customFields:R.compose(
          R.ifElse(
            R.compose(R.gt(R.__,1),R.length),
            (allvarients) => {
              return [
                {
                  name:"Option",
                  options:R.compose(
                    R.join('|'),
                    R.map(
                      vari=>`${vari.varientName}[${positive((vari.price-R.pathOr(0,['0','price'])(allvarients))/100)}]`,
                    ),
                    R.filter(item=>item.price && item.price > 0),
                  )(allvarients),
                  //allvarients.map().join('|'),
                  type:'dropdown'
                }
              ]
            },
            R.always([])
          ),
          R.prop('variants')
        )(input),
      }
    },
    R.path(['node','frontmatter'])
  )),
  R.path(['data','allMarkdownRemark','edges']),
)

const positive = (input) => `${input>=0?'+':''}${input}`

