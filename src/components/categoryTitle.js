import React from "react"

const CategoryTitle = ({ name, Img, hoverText }) => (
  <div title={hoverText} style={{
    border: '1px solid black',
    width: '200px',
    height: '200px',
    position: 'relative'
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
  </div>
)

export default CategoryTitle