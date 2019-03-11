
import React, { Children } from "react"
import { Link } from 'gatsby'
import { Card, Elevation } from "@blueprintjs/core";
import CommingSoon from "./CommingSoon";

const ImageComponent = (input,maxheight='350px') => input ? <img style={{maxheight:maxheight}} alt="product" src={input} /> : null

const CategoryTitle = ({Children, name, hoverText, slug, images, commingSoon, height=250, width=250 }) => (
      <Link 
          to={slug || "/"} 
          title={hoverText}
          style={{}}
        >
        <Card 
          style={{ padding: '15px', margin:'10px', height:`${height}px`, width:`${width}px`}}
          interactive={true}
        elevation={Elevation.TWO}
        >
          <h5>{name}</h5>
          { commingSoon?<CommingSoon/>:''}
          {
            images
            ? ImageComponent(images,`calc(${height}-30px)`)
            : ''
            //images
          }
          {Children}
        </Card>
      </Link>
)

export default CategoryTitle