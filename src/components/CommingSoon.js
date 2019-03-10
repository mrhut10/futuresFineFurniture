import React from 'react'
import { Card, Elevation } from '@blueprintjs/core';
import { Link } from "gatsby"

const CommingSoon = () => (
  <Card
    style={{ padding: 15, margin:'10px'}}
    interactive={false}
    elevation={Elevation.TWO}
  >
    <h5 style={{color:"red", transform:"rotate(-3deg)", fontSize:"1.3rem"}}>Comming Soon</h5>
    <p>
      New Online Products added weekly
      <br/>
      <br/>
      Also see us <Link to ="/contact" >in-store</Link> for the full range
    </p>
  </Card>
)

export default CommingSoon