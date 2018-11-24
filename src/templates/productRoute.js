import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import BuyButton from '../components/snipcart'

const last = input => input[input.length - 1]
const imgAddressToFilename = imageRelAddress => last(imageRelAddress.split('/'))

const formatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: true,
})



export default ({ data, location }) => {
  //const post = data.markdownRemark.frontmatter
  const { title, Category, range, variants } = data.markdownRemark.frontmatter
  //{<div dangerouslySetInnerHTML={{ __html: post.html }} />

  return (
    <Layout>
      <button className="snipcart-checkout">Click here to checkout</button>
      <div>
        <h1>{title}</h1>
        {
          Category && range
            ? `From the ${Category} Collection and the ${range} range`
            : Category
              ? `From the ${Category} Collection`
              : range
                ? `From the ${range} range`
                : ''
        }
        <div>
          {
            //data.markdownRemark.frontmatter.images.map(image => <img src={imgAddressToFilename(image)} />)
          }
        </div>
        <table>
          <thead>
            <tr>
              <th>Option</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              variants.map(vari => (
                <tr key={vari.varientName}>
                  <td>{variants.length > 1 ? vari.varientName : title}</td>
                  <td>{formatter.format(vari.price / 100)}
                  </td>
                  <td>
                    <BuyButton
                      name={`${title}_${vari.varientName}`}
                      id={`${title}_${vari.varientName}`}
                      image={null}
                      url={location.href}
                      price={vari.price}
                      description={null}
                    >
                      Add to Shopping Cart
                    </BuyButton>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

//markdownRemark(frontmatter: {title: {eq: $slug}}) {
export const query = graphql`
query($productName: String!)	{
  markdownRemark(fields:{type: {eq:"product"} productName:{eq:$productName}}) {
    html
    frontmatter {
      title
      images
      enabled
      Category
      range
      variants {
        price
        varientName
        properties {
          propertyType
          propertyValue
        }
      }
    }
    fields {
      type
      slug
      catName
      productName
      catigory
    }
  }
}
`