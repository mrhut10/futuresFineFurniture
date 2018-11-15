import React from "react"
import { Link } from 'gatsby'

const CategoryTitle = ({ name, Img, hoverText, slug }) => (
  <Link
    to={slug || "/"}
    title={hoverText}
    style={{
      border: '1px solid black',
      width: '200px',
      margin: '5px',
      height: '200px',
      position: 'relative',
      textDecoration: 'none'
    }}>
    <h4 style={{
      width: '200px',
      position: 'absolute',
      top: 'calc(100px - 1em)',
      textAlign: 'center'
    }}>
      {name}
    </h4>
    <div style={{ width: '200px', height: '200px' }}>
      {Img ? <Img /> : ''}
    </div>
  </Link>
)

export default CategoryTitle