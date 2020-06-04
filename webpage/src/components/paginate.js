import React from 'react';

const Paginate = ({ pageNum, pageTotal, Back, Forward }) => (
  <div>
    Page {pageNum} of {pageTotal}{' '}
    {pageNum > 1 ? (
      <span className="m-2 underline cream-600">{Back} </span>
    ) : null}
    {pageNum < pageTotal ? (
      <span className="m-2 underline cream-600">{Forward}</span>
    ) : null}
  </div>
);

export default Paginate;
