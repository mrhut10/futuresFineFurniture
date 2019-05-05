import React from 'react';
import { Link } from 'gatsby';
import { Button, Navbar, NavbarGroup, Alignment } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
// import { ICON } from '@blueprintjs/core/lib/esm/common/classes';

const content = {
  left: [
    {
      text: ' Home',
      link: '/',
      icon: IconNames.HOME,
    },
    {
      text: ' Categories',
      link: '/range',
      icon: IconNames.SHOP,
    },
    {
      text: ' Contact',
      link: '/contact',
      icon: IconNames.FOLDER_CLOSE,
    },
  ],
  right: [
    {
      text: ' Cart',
      link: '#',
      icon: IconNames.SHOPPING_CART,
    },
  ],
};
const SizeSafeMenu = () => <NewMenu />;

const NewMenu = () => (
  <Navbar className="max-w-xl mx-auto w-full">
    <NavbarGroup className="bg-grey-darkest flex p-4" align={Alignment.LEFT}>
      {content.left.map(item => (
        <Link
          to={item.link}
          className="mr-4 no-underline hover:underline text-grey-light hover:text-yellow-lighter"
          key={item.link}
        >
          <Button
            large
            className="fill-current mr-2 text-grey-light"
            icon={item.icon}
            text={item.text}
          />
        </Link>
      ))}
      <Button
        large
        className="fill-current mr-2 text-grey-light snipcart-checkout"
        icon={IconNames.SHOPPING_CART}
        text=" Shopping Cart"
      />
    </NavbarGroup>
  </Navbar>
);

export default SizeSafeMenu; // TopMenu
