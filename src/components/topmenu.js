import React from 'react';
import { Link } from 'gatsby';
import { Button, Navbar, NavbarGroup } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

const SizeSafeMenu = () => <NewMenu />;

const NewMenu = () => (
  <Navbar className="max-w-xl mx-auto w-full">
    <NavbarGroup className="bg-grey-darkest flex p-4">
      <Link
        className="mr-4 no-underline hover:underline text-grey-light hover:text-yellow-lighter"
        to="/"
      >
        <Button
          large
          className="fill-current mr-2 text-grey-light"
          icon={IconNames.HOME}
        />
        <span>Home</span>
      </Link>
      <Link
        className="mr-4 no-underline hover:underline text-grey-light hover:text-yellow-lighter"
        to="/range"
      >
        <Button
          large
          className="fill-current mr-2 text-grey-light"
          icon={IconNames.SHOP}
        />
        <span>Categories</span>
      </Link>
      <Link
        className="mr-4 no-underline hover:underline text-grey-light hover:text-yellow-lighter"
        to="/contact"
      >
        <Button
          large
          className="fill-current mr-2 text-grey-light"
          icon={IconNames.FOLDER_CLOSE}
        />
        <span>Contact</span>
      </Link>
    </NavbarGroup>
  </Navbar>
);

export default SizeSafeMenu; // TopMenu
