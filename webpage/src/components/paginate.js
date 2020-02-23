import React from 'react';

const Paginate = ({ pageNum, pageTotal, Back, Forward }) => (
  <div>
    Page {pageNum} of {pageTotal}{' '}
    {pageNum > 1 ? (
      <span className="underline cream-600 m-2">{Back} </span>
    ) : null}
    {pageNum < pageTotal ? (
      <span className="cream-600 underline m-2">{Forward}</span>
    ) : null}
  </div>
);

export default Paginate;
