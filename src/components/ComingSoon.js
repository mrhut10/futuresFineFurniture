import React from 'react';
import { Link } from 'gatsby';

const ComingSoon = () => (
  <div className="text-grey-darkest">
    <h5
      className="text-lg text-red-dark"
      style={{ transform: 'rotate(-3deg)' }}
    >
      Coming Soon
    </h5>
    <p>New Online Products added weekly</p>
    <p>
      Also see us <Link to="/contact">in-store</Link> for the full range
    </p>
  </div>
);

export default ComingSoon;
