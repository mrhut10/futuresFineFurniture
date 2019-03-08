
import React from "react"
import { Link } from 'gatsby'
import { Card, Elevation } from "@blueprintjs/core";
import { StaticQuery, graphql } from "gatsby"
const { compose, last, lift, pathOr, split, } = require('ramda')

const ImageComponent = input => input ? <img alt="product" src={input} /> : null

const CategoryTitle = ({ name, hoverText, slug, images, overlay }) => (
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
      <Link 
          to={slug || "/"} 
          title={hoverText}
          style={{}}
        >
        <Card 
          style={{ padding: 15, margin:'10px', height:'400px', width: '250px'}}
          interactive={true}
        elevation={Elevation.TWO}
        >
          <h5>{name}</h5>
          {
            images
            ? ImageComponent(images)
            : ''
            //images
          }
          <br/>... more
        </Card>
      </Link>
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