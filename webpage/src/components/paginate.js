import React from 'react';

const Paginate = ({currentNumber, maxNumber, linkNext, linkPrev}) => (
  <p>
    {linkPrev} page: {currentNumber} of {maxNumber} {linkNext}
  </p>
);

export default Paginate;
