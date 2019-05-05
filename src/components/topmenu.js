import React from 'react';
import { Link } from 'gatsby';
import { Button, Navbar, NavbarGroup, Alignment } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

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
      icon: IconNames.PHONE,
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
    <NavbarGroup
      className="bg-grey-darkest flex justify-between p-4"
      align={Alignment.LEFT}
    >
      <div className="flex">
        {content.left.map(item => (
          <Link to={item.link} className="mr-4" key={item.link}>
            <Button
              large
              className="flex fill-current font-semibold items-center mr-2 text-grey-light hover:text-cream"
              icon={item.icon}
              text={item.text}
            />
          </Link>
        ))}
      </div>
      <Button
        large
        className="flex fill-current font-semibold items-center mr-2 text-grey-light hover:text-cream snipcart-checkout"
        icon={IconNames.SHOPPING_CART}
        text="Shopping Cart"
      />
    </NavbarGroup>
  </Navbar>
);

export default SizeSafeMenu;
