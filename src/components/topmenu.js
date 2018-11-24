import React from 'react'
import { Link } from 'gatsby'
//import { HoverSensor } from 'libreact/lib/HoverSensor'
import {
  Alignment,
  Button,
  Classes,
  Menu,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Popover,
  Position,
  MenuItem,
  ResizeSensor,
  IResizeEntry

} from '@blueprintjs/core'
import { IconNames } from "@blueprintjs/icons";


const listings = [
  { name: 'Bedroom', link: '/category/Bedroom' },
  { name: 'Dinning Room', link: '/category/Dinning' },
  { name: 'Living Room', link: '/category/Living' },
  { name: 'Outdoor', link: '/category/Outdoor' },
]

const SizeSafeMenu = () => <ResizeSensor><NewMenu size /></ResizeSensor>


const NewMenu = ({ size }) => <Navbar>
  <div>{size}</div>
  <NavbarGroup align={Alignment.LEFT}>
    <NavbarHeading><Link to="/"><Button large className={Classes.MINIMAL} icon={IconNames.HOME} /></Link></NavbarHeading>
    <NavbarDivider />
  </NavbarGroup>
  <NavbarGroup >
    {listings.map(item => <NewItem item={item} />)}
  </NavbarGroup>
  <NavbarGroup align={Alignment.RIGHT}>
    <NavbarDivider />
    <Link to="/contact"><Button large className={Classes.MINIMAL} text="About Us" icon={IconNames.FOLDER_CLOSE} /></Link>
  </NavbarGroup>
</Navbar>

const NewItem = ({ item }) => <Link to={item.link}><Button large className={Classes.MINIMAL} text={item.name} /></Link>


/*

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
    {listings.map(item => <ListItem key={item.name} item={item} />)}
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

*/
export default SizeSafeMenu //TopMenu