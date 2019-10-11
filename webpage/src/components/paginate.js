import React from 'react';
import { Link } from 'gatsby';
import queryStrings from 'query-string';
import { changeObjectProb } from "../helpers";

const Paginate = ({currentNumber, maxNumber, location}) => {
  const LinkPrev =
    currentNumber <= 1 ? null : (
      <Link
        to={`${location.pathname}?${queryStrings.stringify(
          changeObjectProb(
            queryStrings.parse(location.search),
            'page',
            currentNumber - 1
          )
        )}`}
      >
        Prev {"<<"}
      </Link>
    );
  const LinkNext =
    currentNumber >= maxNumber ? null : (
      <Link
        to={`${location.pathname}?${queryStrings.stringify(
          changeObjectProb(
            queryStrings.parse(location.search),
            'page',
            currentNumber + 1
          )
        )}`}
      >
        {">>"} Next
      </Link>
  );
  return (
    <p>
      {LinkPrev} page: {currentNumber} of {maxNumber} {LinkNext}
    </p>
  );
};

export default Paginate;
