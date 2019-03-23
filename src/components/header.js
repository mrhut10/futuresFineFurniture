import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Hero from './Hero';

const Header = () => (
  <header className="bg-maroon max-w-xl mx-auto overflow-hidden p-4 relative rounded-t-lg w-full">
    <h1 className="m-0">
      <Link to="/">
        <Hero />
      </Link>
    </h1>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
