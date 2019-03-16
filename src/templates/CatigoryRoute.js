import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import CategoryTitle from '../components/categoryTile'
import CommingSoon from '../components/CommingSoon'
import SEO from "../components/seo"
const R = require("ramda")


const formatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: true,
})



const GetsourceImages = R.compose(
  R.lift(
    (input)=>{ 
      return {
        relativePath:R.pathOr('',['node','relativePath'])(input),
        source:R.pathOr('',['node','childImageSharp','fixed','src'])(input)
      }
    },
  ),
  R.pathOr([],['allFile','edges'])
)

const findImage = R.compose(
  R.last,
  R.split('/'),
  (input)=>String(input),
  R.pathOr('',['frontmatter','images'])
)

export default ({ data, pageContext }) => {
  const post = data.cat
  const products = data.products
  const sourceImages = GetsourceImages(data)

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        keywords={post.frontmatter.keywords || []}
      />
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
          {
            products 
            ? products.edges.map(
              ({ node }) => <CategoryTitle
                  key={node.frontmatter.title}
                  name={node.frontmatter.title}
                  slug={`${pageContext.slug}/${node.fields.productName}`}
                  images={
                    R.compose(
                      R.pathOr('',['source']),
                      R.find(R.compose(
                        R.equals(findImage(node)),
                        R.pathOr('',['relativePath'])
                      )),
                    )(sourceImages)
                  }
                  Children={
                    R.compose(
                      input=>input
                      ? <p style={{
                          color:"red",
                          margin:'auto auto'
                        }}>
                          from {input}
                        </p>
                      : null,
                      formatter.format,
                      R.divide(R.__,100),
                      R.head,
                      R.sort((a,b)=>a-b),
                      R.lift(R.prop('price')),
                      R.pathOr([],['frontmatter','variants'])
                    )(node)
                  }
                />
          ) : <CommingSoon />}
        </div>
        
      </div>
    </Layout>
  )
}

//markdownRemark(frontmatter: {title: {eq: $slug}}) {

export const query = graphql`
query ($slug: String $catName: String) {
  cat: markdownRemark(fields: {slug: {eq: $slug}}) {
    html
    frontmatter {
      title
      variants{
        price,
        varientName
      }
      keywords
    }
  }
  allFile(filter: {sourceInstanceName:{eq:"contentImages"}}){
    edges{
      node{
        relativePath
        absolutePath
        childImageSharp{
          fixed(width:200){
            src
          }
        }
      }
    }
  },
  products: allMarkdownRemark(filter: {fields: { type:{eq:"product"} catigory: {eq: $catName}}}) {
    edges {
      node {
        id
        frontmatter{
          title,
          images,
          variants{
            price,
            varientName
          }
        }
        fields{productName}
      }
    }
  }
}
`