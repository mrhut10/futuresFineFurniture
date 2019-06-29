import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { MdHome, MdPhone, MdShoppingCart, MdStore } from 'react-icons/md';

const NewMenu = () => (
  <div className="bg-maroon-800 md:flex items-center leading-none max-w-5xl mx-auto relative shadow-md sticky text-maroon-100 top-0 w-full z-50">
    <div className="flex flex-wrap items-center max-w-4xl mx-auto px-4 w-full">
      <div className="flex justify-between w-full md:w-auto">
        <button
          className="fill-current flex md:hidden items-center justify-center p-4 text-cream-200"
          onClick={() => {
            const element = document.getElementById('nav');
            element.classList.toggle('hidden');
          }}
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
      </div>
      <nav
        id="nav"
        className="hidden md:flex md:flex-1 md:items-center relative w-full md:w-auto"
      >
        <NavLink link="/" title="Home">
          <MdHome className="flex items-center justify-center mr-1 text-cream-200 text-lg" />
        </NavLink>
        <NavLink link="/range" title="Categories">
          <MdStore className="flex items-center justify-center mr-1 text-cream-200 text-lg" />
        </NavLink>
        <NavLink link="/contact" title="Contact">
          <MdPhone className="flex items-center justify-center mr-1 text-cream-200 text-lg" />
        </NavLink>
      </nav>
      <button
        className="snipcart-checkout bg-maroon-800 bottom-0 right-0 fixed font-bold h-12 w-12 no-underline mb-4 mr-10 rounded-full shadow-md text-cream-300 hover:text-cream-200"
        type="button"
      >
        <MdShoppingCart className="flex items-center justify-center text-cream-200 text-2xl leading-none mt-1" />
      </button>
    </div>
  </div>
);

const NavLink = ({ children, link, title }) => (
  <Link
    to={link}
    className="border-maroon-700 border-t md:border-none flex font-bold items-center px-4 md:px-3 py-3 text-cream-300 hover:text-cream-200"
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
