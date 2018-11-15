import React from "react"
import { graphql } from "gatsby"

import Layout from '../components/layout'
import CategoryTitle from '../components/categoryTitle'

export const query = graphql`
{allMarkdownRemark(filter:{fields:{type:{eq:"productCats"}}}){edges{node{
  frontmatter{title}
  excerpt(pruneLength:50)
}}}}
`


const rangePage = ({ data }) => (
  <Layout>
    <h1>Full Range</h1>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {data.allMarkdownRemark.edges.map(edge => <CategoryTitle name={edge.node.frontmatter.title} hoverText={edge.node.excerpt} />)}
    </div>
  </Layout>
)



export default rangePage
