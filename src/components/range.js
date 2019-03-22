import React from "react"
import { StaticQuery, graphql } from "gatsby"
//import { Card, Elevation } from "@blueprintjs/core"
//import { propOr } from "ramda"

import CategoryTitle from './categoryTile'
import { Card } from "@blueprintjs/core";
const R = require('ramda')

const CatigoryCounts = R.compose(
  //should be object with keys totalCount and fieldValue
  R.pathOr([],['proCount','group'])
)

const GetsourceImages = R.compose(
  R.map(
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
  input=>String(input),
  R.prop('images')
)

const Categories = ({ data }) => (
  <StaticQuery
    query={graphql`
    {
      proCount: allMarkdownRemark(filter: {fields: {type: {eq: "product"}}}) {
        group(field:frontmatter___Category) {
          totalCount
          fieldValue
        }
      }
      allMarkdownRemark(filter: {fields: {type: {eq: "productCats"}}}) {
        edges {
          node {
            frontmatter {
              title
              images
              order
              parent
              enabled
            }
            excerpt(pruneLength: 50)
            fields {
              slug
            }
          }
        }
      }
      allFile(filter: {sourceInstanceName: {eq: "contentImages"}}) {
        edges {
          node {
            relativePath
            childImageSharp {
              fixed(width: 400) {
                src
              }
            }
          }
        }
      }
    }
    `}
    render={data => {
      return <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
        {
          R.compose(
            R.map(
              input => <CategoryTitle
                key={input.title}
                name={
                  input.title
                }
                slug={input.slug}
                hoverText={input.excerpt}
                images={
                  R.compose(
                    R.prop('source'),
                    R.find(
                      R.propEq('relativePath',findImage(input))
                    ),
                    GetsourceImages
                  )(data)
                } 
                commingSoon={! (input.count && input.count > 0)}
                height={300}
              />
            ),
            R.sort((a,b)=>b.count-a.count),
            R.filter(R.and(
              R.propEq('parent',''),
              R.propOr(false,'enabled')
              )
            ),
            R.map(R.compose(
              input=>{
                return {
                  title:R.pathOr('',['frontmatter','title'],input),
                  slug:R.pathOr('/404',['fields','slug'],input),
                  excerpt:R.pathOr('',['excerpt'],input),
                  images:R.pathOr([],['frontmatter','images'],input),
                  count:R.compose(
                    R.propOr(0,'totalCount'),
                    R.find(R.propEq(
                      'fieldValue',
                      R.pathOr('',['frontmatter','title'])(input)
                    )),
                    CatigoryCounts
                  )(data),
                  parent:R.pathOr('',['frontmatter','parent'])(input),
                  enabled:R.pathOr(false,['frontmatter','enabled'])(input)
                }
              },
              R.pathOr({},['node'])
            )),
            R.pathOr([],['allMarkdownRemark','edges'])
          )(data)
        }
      </div>
    }}
  />
)

export default {
 Categories
}
