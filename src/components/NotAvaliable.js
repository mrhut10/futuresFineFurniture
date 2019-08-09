import React from 'react';
import { Link } from 'gatsby';

const NotAvaliable = ({ text, subtext, showContact }) => (
  <div className="text-gray-800">
    <h5 className="text-lg text-red-600" style={{ transform: 'rotate(-3deg)' }}>
      {text}
    </h5>
    <br />
    <p>{subtext}</p>
    {showContact === true ? (
      <p>
        Also see us <Link to="/contact">in-store</Link> for our exclusive
        in-store range
      </p>
    ) : null}
  </div>
);

export default NotAvaliable;
