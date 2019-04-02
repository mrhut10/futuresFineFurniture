import React from 'react';
import * as R from 'ramda';

export const query = graphql`
{
  allMarkdownRemark(filter: {fields: {type: {eq: "product"}}}) {
    edges {
      node {
        frontmatter {
          title
          Category
          range
          images
          variants {
            price
            varientName
          }
        }
      }
    }
  }
}
`;

const snipcart_json = ({data}) => <>{R.compose(
  JSON.stringify,
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
        url:'/snipcartJSON',
        customFields:R.compose(
          R.ifElse(
            R.compose(R.gt(R.__,1),R.length),
            (allvarients) => {
              return [
                {
                  name:"Option",
                  options:allvarients.map(vari=>`${vari.varientName}[${positive((vari.price-R.pathOr(0,['0','price'])(allvarients))/100)}]`),
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
  R.path(['allMarkdownRemark','edges']),
)(data)}</>


const positive = (input) => `${input>=0?'+':''}${input}`
export default snipcart_json