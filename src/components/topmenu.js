import React from 'react'
import { Link } from 'gatsby'


const listings = [
  { name: 'Dinning Room' },
  { name: 'Living Room' },
  { name: 'Bedroom' },
  { name: 'Outdoor Furniture' },
  { name: 'Local Delivery' },
  { name: 'Somthing else' },
]

const TopMenu = () => (
  <ul
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${listings.length}, 1fr)`,
      textDecoration: 'none'
    }}
  >
    {listings.map(item => <ListItem item={item} />)}
  </ul>
)

const ListItem = ({ item }) => (
  <ul>{item.name}</ul>
)

export default TopMenu