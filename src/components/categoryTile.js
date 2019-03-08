
import React from "react"
import { Link } from 'gatsby'
import { Card, Elevation } from "@blueprintjs/core";
import { StaticQuery, graphql } from "gatsby"
///const { compose, last, lift, pathOr, split, } = require('ramda')

const CategoryTitle = ({ name, hoverText, slug, images }) => (
  <StaticQuery 
    query={graphql`{
      allFile(filter: {sourceInstanceName: {eq: "contentImages"}}) {
        edges {
          node {
            relativePath
            childImageSharp {
              fixed(width: 200) {
                src
              }
            }
          }
        }
      }
    }
    `}
    render={data=>(
      <Card 
        style={{ padding: 15, margin:'10px', width: '150', height:'150px'}}
        interactive={true}
      elevation={Elevation.TWO}
      >
        <Link 
          to={slug || "/"} 
          title={hoverText}
          style={{}}
        >
          <h5>{name}</h5>
          {//data.allFile.edges
            //.filter(node=>images && images.length > 0 && images.contains(node.node.relativePath))
            //.map(node=>node.node.childImageSharp.fixed.src)
            
          }
          <br/>click for more
        </Link>
      </Card>
    )}
  />
)

//      <CategoryTitle name={name} Img={Img} hoverText={hoverText} slug={slug} />

const oldCategoryTitle = ({ name, Img, hoverText, slug }) => (
  <Link
    to={slug || "/"}
    title={hoverText}
    style={{
      display: 'block',
      position: 'relative',
      width: '150px',
      height: '150px',
      margin: '5px',
      textDecoration: 'none',
      overflow: 'hidden',
      border: '1px solid blue'
    }}
  >
    <h4 style={{
      position: 'absolute',
      width: '100%',
      top: 'calc(100px - 1em)',
      textAlign: 'center'
    }}>
      {name}
    </h4>
    <div style={{ width: '200px', height: '200px' }}>

    </div>
  </Link>
)

export default CategoryTitle