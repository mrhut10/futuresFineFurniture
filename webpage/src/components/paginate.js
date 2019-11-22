import React from 'react';
import { Link } from 'gatsby';
import queryStrings from 'query-string';
import { changeObjectProb } from "../helpers";

const Paginate = ({currentNumber, maxNumber, location, productsPerPage}) => {
  const LinkPrev =
    currentNumber <= 1 ? null : (
      <Link
        to={location.pathname}
        state={{
          pageNum: currentNumber - 1,
          productsPerPage,
        }}
      >
        Prev {"<<"}
      </Link>
    );
  const LinkNext =
    currentNumber >= maxNumber ? null : (
      <Link
        to={location.pathname}
        state={{
          pageNum: currentNumber + 1,
          productsPerPage,
        }}
      >
        Next {">>"}
      </Link>
    );
  return (
    <p>
      {LinkPrev} page: {currentNumber} of {maxNumber} {LinkNext}
    </p>
  );
};

export default Paginate;
