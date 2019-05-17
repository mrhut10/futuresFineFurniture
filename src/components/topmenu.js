import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

const SizeSafeMenu = () => <NewMenu />;

const handleClick = e => {
  e.preventDefault();
  const element = document.getElementById('nav');
  element.classList.toggle('block');
  element.classList.toggle('hidden');
};

const NewMenu = () => (
  <div className="bg-grey-darkest md:flex items-center leading-none max-w-xl mx-auto pin-t relative shadow-md sticky text-white w-full z-50">
    <div className="flex flex-wrap items-center max-w-lg mx-auto w-full">
      <div className="flex justify-between w-full md:w-auto">
        <button
          className="fill-current flex md:hidden items-center justify-center p-4 text-grey-lighter"
          onClick={handleClick}
          type="button"
        >
          <svg
            className="fill-current h-4 w-4"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
        <button
          className="snipcart-checkout flex font-semibold group items-center md:justify-end no-underline p-4 lg:pr-0 text-grey-lighter hover:text-cream"
          type="button"
        >
          <Icon
            className="fill-current flex items-center justify-center mr-1 text-grey-lighter group-hover:text-cream"
            icon={IconNames.SHOPPING_CART}
          />
          Shopping Cart
        </button>
      </div>
      <nav
        id="nav"
        className="sm:first hidden md:flex md:flex-1 md:items-center relative w-full md:w-auto"
      >
        <NavLink icon={IconNames.HOME} link="/" title="Home" />
        <NavLink icon={IconNames.SHOP} link="/range" title="Categories" />
        <NavLink icon={IconNames.PHONE} link="/contact" title="Contact" />
      </nav>
    </div>
  </div>
);

const NavLink = ({ link, icon, title }) => (
  <Link
    to={link}
    className="hover:bg-grey-darker md:hover:bg-grey-darkest border-grey-dark border-t md:border-none flex font-semibold group items-center px-4 sm:px-12 md:px-3 py-3 text-grey-lighter hover:text-cream"
  >
    <Icon
      className="fill-current flex items-center justify-center mr-1 text-grey-lighter group-hover:text-cream"
      icon={icon}
    />
    {title}
  </Link>
);
NavLink.propTypes = {
  link: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
};

export default SizeSafeMenu;
