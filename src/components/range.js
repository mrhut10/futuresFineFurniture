import React from "react"
import { StaticQuery, graphql } from "gatsby"

import CategoryTitle from './categoryTile'
import RangeDisplay from '../components/range'

const Categories = ({ data }) => (
  <StaticQuery
    query={graphql`
      {allMarkdownRemark(filter:{fields:{type:{eq:"productCats"}}}){edges{node{
        frontmatter{title}
        excerpt(pruneLength:50)
        fields{slug}
      }}}}
    `}
    render={data => <div style={{ display: 'flex', flexwrap: 'wrap' }}>
      {data.allMarkdownRemark.edges.map(edge => (
        <CategoryTitle name={edge.node.frontmatter.title} slug={edge.node.fields.slug} />
      ))}
    </div>
    }
  />
)

export default {
  Categories
}

/*export default {
  Categories
}


*/