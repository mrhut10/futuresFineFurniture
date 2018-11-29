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
  IResizeEntry,
  Icon

} from '@blueprintjs/core'
import { IconNames } from "@blueprintjs/icons";

const SizeSafeMenu = () => <div style={{ maxWidth: 960, margin: "0 auto" }}><NewMenu /></div>


const NewMenu = ({ size }) => <Navbar className="bp3-dark">
  <NavbarGroup align={Alignment.LEFT}>
    <NavbarHeading><Link to="/"><Button large className={Classes.MINIMAL} icon={IconNames.HOME} /></Link></NavbarHeading>
    <NewItem item={{ link: '/range/', name: "Categories", icon: IconNames.FOLDER_NEW }} />
    <Link align={Alignment.CENTER} to="/contact"><Button large className={Classes.MINIMAL} text="About" icon={IconNames.FOLDER_CLOSE} /></Link>
  </NavbarGroup>
</Navbar>

const NewItem = ({ item }) => <Link to={item.link}><Button large className={Classes.MINIMAL} text={item.name} icon={IconNames.SHOP} /></Link>


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