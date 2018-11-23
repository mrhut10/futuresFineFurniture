import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import styles from './product.module.css'


const BuyButton = ({ name, id, image, url, price, description, children }) => <button
  type="button"
  className={`${styles.buyButton} snipcart-add-item`}
  data-item-name={name}
  data-item-id={id}
  data-item-image={image}
  data-item-url={url}
  price={price}
  description={description}
>
  {children}
</button>

export default ({ data, location }) => {
  //const post = data.markdownRemark.frontmatter
  const { title, Category, range, variants } = data.markdownRemark.frontmatter
  //{<div dangerouslySetInnerHTML={{ __html: post.html }} />

  return (
    <Layout>
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
        <table>
          <thead>
            <tr>
              <th>Option</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {
              variants.map(vari => <tr key={vari.varientName}>
                <td>{variants.length > 1 ? vari.varientName : title}</td>
                <td>
                  <BuyButton
                    name={`${title}--${vari.varientName}`}
                    id={`${title}--${vari.varientName}`}
                    image={null}
                    url={location.href}
                    price={vari.price.toString(10)}
                    description={null}
                  >
                    Buy it now for ${vari.price}
                  </BuyButton>
                </td>
              </tr>)
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