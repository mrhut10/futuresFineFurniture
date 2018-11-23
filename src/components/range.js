import React from "react"
import { StaticQuery, graphql } from "gatsby"

import CategoryTitle from './categoryTile'


const edgeToCategoryTile = edge => <CategoryTitle key={edge.node.frontmatter.title} name={edge.node.frontmatter.title} slug={edge.node.fields.slug} hoverText={edge.node.excerpt} />

const Categories = ({ data }) => (
  <StaticQuery
    query={graphql`
      {allMarkdownRemark(filter:{fields:{type:{eq:"productCats"}}}){edges{node{
        frontmatter{title}
        excerpt(pruneLength:50)
        fields{slug}
      }}}}
    `}
    render={data => (
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
        {data.allMarkdownRemark.edges.map(edgeToCategoryTile)}
      </div>
    )}
  />
)

export default {
  Categories
}