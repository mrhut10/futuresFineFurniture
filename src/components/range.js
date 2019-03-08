import React from "react"
import { StaticQuery, graphql } from "gatsby"
//import { Card, Elevation } from "@blueprintjs/core"
//import { propOr } from "ramda"

import CategoryTitle from './categoryTile'

const edgeToCategoryTile = edge => <CategoryTitle key={edge.node.frontmatter.title} name={edge.node.frontmatter.title} slug={edge.node.fields.slug} hoverText={edge.node.excerpt} images={edge.node.fields.images} />

const Categories = ({ data }) => (
  <StaticQuery
    query={graphql`
      {allMarkdownRemark(filter:{fields:{type:{eq:"productCats"}}}){edges{node{
        frontmatter{title, images,order}
        excerpt(pruneLength:50)
        fields{slug}
      }}}
      allFile(filter: {sourceInstanceName: {eq: "contentImages"}}) {edges{node{
        childImageSharp {
          fixed(width: 400) {
            src
          }
        }
      }}}
      }
    `}
    render={data => (
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
        {
          data.allMarkdownRemark.edges.map(edgeToCategoryTile)
        }
      </div>
    )}
  />
)

export default {
 Categories
}