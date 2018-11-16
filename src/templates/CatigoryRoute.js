import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import CategoryTitle from '../components/categoryTile'

export default ({ data }) => {
  const post = data.cat
  const products = data.products
  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <div style={{ display: 'flex' }}>
          {products ? products.edges.map(
            ({ node }) => <CategoryTitle name={node.frontmatter.title} />
          ) : ''}
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
    }
  }
  products: allMarkdownRemark(filter: {fields: { type:{eq:"product"} catigory: {eq: $catName}}}) {
    edges {
      node {
        id
        frontmatter{title}
      }
    }
  }
}
`