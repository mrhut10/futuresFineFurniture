import React from 'react';
import PropTypes from 'prop-types';

const Wrapper = ({ children }) => (
  <div className="w-full max-w-4xl px-4 py-12 mx-auto">{children}</div>
);
Wrapper.propTypes = {
  children: PropTypes.any,
};

export default Wrapper;
