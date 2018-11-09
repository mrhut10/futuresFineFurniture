import React from 'react'
import { Link } from 'gatsby'


const listings = [
  { name: 'Home', link: '/' },
  { name: 'Dinning Room', link: '/range/Dinning' },
  { name: 'Living Room' },
  { name: 'Bedroom' },
  { name: 'Outdoor Furniture' },
  { name: 'Local Delivery' },
  { name: 'Somthing else' },
]

const TopMenu = () => (
  <ul
    style={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      //justifyContent: 'flex-start',//'center',
      //gridTemplateColumns: `repeat(${listings.length}, 1fr)`,
      textDecoration: 'none',
      background: 'gray',
      borderRadius: '5px',
      overflow: 'hidden'
    }}
  >
    {listings.map(item => <ListItem item={item} />)}
  </ul>
)

const ListItem = ({ item }) => (
  <ul style={{
    margin: '5px',
    background: 'white',
    borderRadius: '10px',
    padding: '5px 15px',
    textAlign: 'center',
    flexBasis: 'auto',
    margin: '5px'
  }}>
    <Link to={item.link || '/'}>
      {item.name}
    </Link>
  </ul>
)

export default TopMenu