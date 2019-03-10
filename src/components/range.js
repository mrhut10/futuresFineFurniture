import React from "react"
import { StaticQuery, graphql } from "gatsby"
//import { Card, Elevation } from "@blueprintjs/core"
//import { propOr } from "ramda"

import CategoryTitle from './categoryTile'
import CommingSoon from "./CommingSoon";
import { Card } from "@blueprintjs/core";
import { object } from "prop-types";
import { type } from "os";
const R = require('ramda')

const CatigoryCounts = R.compose(
  //should be object with keys totalCount and fieldValue
  R.pathOr([],['proCount','group'])
)

/*const edgeToCategoryTile = data => edge => countOfProductsByCatigory(data)(edge.node.frontmatter.title) > 0
  ? <CategoryTitle key={edge.node.frontmatter.title} name={edge.node.frontmatter.title} slug={edge.node.fields.slug} hoverText={edge.node.excerpt} images={edge.node.fields.images} />
  : <CommingSoon />
*/
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
    render={data => (
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
        {
          //data.allMarkdownRemark.edges.map(edgeToCategoryTile(data))
          //prodCatsToCard(data)
          R.compose(
            R.map(
              input => <CategoryTitle
                key={input.title}
                name={input.title}
                slug={input.slug}
                hoverText={input.excerpt}
                images={input.images} 
                commingSoon={
                  input.count && input.count > 0 ? false : true
                }
              />
            ),
            R.sort((a,b)=>b.count-a.count),
            R.map(R.compose(
              input=>{
                return {
                  title:R.pathOr('',['frontmatter','title'],input),
                  slug:R.pathOr('/404',['fields','slug'],input),
                  excerpt:R.pathOr('',['excerpt'],input),
                  images:R.pathOr([],['frontmatter','images']),
                  count:R.compose(
                    R.propOr(0,'totalCount'),
                    R.find(R.propEq(
                      'fieldValue',
                      R.pathOr('',['frontmatter','title'])(input)
                    )),
                    CatigoryCounts
                  )(data)
                }
              },
              R.pathOr({},['node'])
            )),
            R.pathOr([],['allMarkdownRemark','edges'])
          )(data)
        }
      </div>
    )}
  />
)
const prodCatsToCard = R.compose(
  R.map(
    //input => <h5>{input.fieldValue}<br/>{input.totalCount}</h5>
    R.ifElse(
      R.propSatisfies(R.gt(0),'totalCount'),
      input => <Card><h5>false<br/>{input.fieldValue} {input.totalCount}</h5></Card>,
      input => <Card><h5>true<br/>{input.fieldValue} {input.totalCount}</h5></Card>,
    )
  ),
  CatigoryCounts
)

export default {
 Categories
}

function divObject(O){
  return <ul>
    {
      Object.keys(O).map(
        k=><li>
          {
            R.type(O[k])=="Object" || R.type(O[k])=="Array"
            ? `{
              ${divObject(O[k])}
            }`
            : String(O[k])
          }
        </li>
      )
    }
  </ul>
}
