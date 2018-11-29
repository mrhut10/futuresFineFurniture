import React from "react"
import { Link } from 'gatsby'
import { Button, Card, Elevation } from "@blueprintjs/core";

const NewTitle = ({ name, Img, hoverText, slug }) => (
  <Link style={{ padding: 0 }} to={slug || "/"}>
    <Card
      style={{

      }}
      interactive={true}
      elevation={Elevation.TWO}
    >
      <CategoryTitle name={name} Img={Img} hoverText={hoverText} slug={slug} />
    </Card>
  </Link>
)


const CategoryTitle = ({ name, Img, hoverText, slug }) => (
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
      {Img ? <Img /> : ''}
    </div>
  </Link>
)

export default NewTitle //CategoryTitle