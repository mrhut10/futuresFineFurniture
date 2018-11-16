import React from "react"
import { Link } from 'gatsby'

const CategoryTitle = ({ name, Img, hoverText, slug }) => (
  <Link
    to={slug || "/"}
    title={hoverText}
    style={{
      display: 'block',
      position: 'relative',
      width: '200px',
      height: '200px',
      margin: '5px',
      border: '1.5px solid black',
      textDecoration: 'none',
      overflow: 'hidden',
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
      {Img ? <Img /> : ''}
    </div>
  </Link>
)

export default CategoryTitle