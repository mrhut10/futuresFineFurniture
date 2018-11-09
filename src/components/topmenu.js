import React from 'react'
import { Link } from 'gatsby'
import { HoverSensor } from 'libreact/lib/HoverSensor'


const listings = [
  { name: 'Dinning Room', link: '/range/Dinning' },
  { name: 'Living Room', link: '/range/Living' },
  { name: 'Bedroom', link: '/range/Bedroom' },
  { name: 'Outdoor Furniture', link: '/range/Outdoor' },
  { name: 'Local Delivery', link: '/Delivery' },
  { name: 'Contact Us', link: '/Contact' },
]

const TopMenu = () => (
  <div
    style={{
      backgroundColor: '#333',
      overflow: 'hidden',
      //display: 'flex',
      //flexDirection: 'row',
      //flexWrap: 'wrap',
      //justifyContent: 'center',
      //textDecoration: 'none',
      //borderRadius: '5px',
    }}
  >
    {listings.map(item => <ListItem item={item} />)}
  </div>
)

const ListItem = ({ item }) => (
  <>
    <HoverSensor>{({ isHover }) =>
      <Link
        style={{
          float: 'left',
          display: 'block',
          backgroundColor: isHover ? '#ddd' : 'inherit',
          color: isHover ? 'black' : '#f2f2f2',
          textAlign: 'center',
          padding: '14px 16px',
          textDecoration: 'none',
        }}
        to={item.link || '/'}
      >
        {item.name}
      </Link>
    }
    </HoverSensor>
  </>
)

export default TopMenu