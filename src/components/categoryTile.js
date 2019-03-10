
import React from "react"
import { Link } from 'gatsby'
import { Card, Elevation } from "@blueprintjs/core";
import CommingSoon from "./CommingSoon";

const ImageComponent = input => input ? <img alt="product" src={input} /> : null

const CategoryTitle = ({ name, hoverText, slug, images, commingSoon }) => (
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
          { commingSoon?<CommingSoon/>:''}
          {
            images
            ? ImageComponent(images)
            : ''
            //images
          }
          <br/>... more
        </Card>
      </Link>
)

export default CategoryTitle