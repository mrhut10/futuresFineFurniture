import React from "react"
//import { Link } from 'gatsby'
import {
  //  Button,
  Card,
  Elevation
} from "@blueprintjs/core"


const ProductSummary = (input /*{ sku, name, desc, varients }*/) => {
  return <Card key={Math.random()}
    interactive={true}
    elevation={Elevation.TWO}
    style={{ margin: '10px' }}
  >
    <div
      dangerouslySetInnerHTML={{ __html: JSON.stringify(input) }}
    />
    <p style={{ width: '13rem' }}>Whats Up</p>
  </Card>
}

export default ProductSummary
