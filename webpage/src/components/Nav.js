import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { MdHome, MdPhone, MdShoppingCart, MdStore } from 'react-icons/md';

const NewMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative sticky top-0 z-50 items-center w-full max-w-5xl mx-auto leading-none shadow-md bg-maroon-800 md:flex text-maroon-100">
      <div className="flex flex-wrap items-center w-full max-w-4xl px-4 mx-auto">
        <div className="flex justify-between w-full md:w-auto">
          <button
            className="flex items-center justify-center p-4 fill-current md:hidden text-cream-200"
            onClick={() => setIsOpen(prev => !prev)}
            type="button"
          >
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        {isOpen && (
          <nav
            id="nav"
            className="relative w-full md:flex md:flex-1 md:items-center md:w-auto"
          >
            <NavLink link="/" title="Home">
              <MdHome className="flex items-center justify-center mr-1 text-lg text-cream-200" />
            </NavLink>
            <NavLink link="/range" title="Categories">
              <MdStore className="flex items-center justify-center mr-1 text-lg text-cream-200" />
            </NavLink>
            <NavLink link="/contact" title="Contact">
              <MdPhone className="flex items-center justify-center mr-1 text-lg text-cream-200" />
            </NavLink>
          </nav>
        )}
        <button
          className="fixed bottom-0 right-0 z-10 flex items-center justify-center w-12 h-12 mb-4 mr-10 font-bold no-underline rounded-full shadow-md snipcart-checkout bg-maroon-800 text-cream-300 hover:text-cream-200"
          type="button"
        >
          <MdShoppingCart className="mt-1 text-2xl leading-none text-cream-200" />
        </button>
      </div>
    </div>
  );
};

const NavLink = ({ children, link, title }) => (
  <Link
    to={link}
    className="flex items-center px-4 py-3 font-bold border-t border-maroon-700 md:border-none md:px-3 text-cream-300 hover:text-cream-200"
  >
    {children}
    {title}
  </Link>
);
NavLink.propTypes = {
  children: PropTypes.object,
  link: PropTypes.string,
  title: PropTypes.string,
};

export default NewMenu;
