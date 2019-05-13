import React from 'react';
import PropTypes from 'prop-types';

const Wrapper = ({ children }) => (
  <div className="max-w-lg mx-auto p-4">{children}</div>
);
Wrapper.propTypes = {
  children: PropTypes.any,
};

export default Wrapper;
