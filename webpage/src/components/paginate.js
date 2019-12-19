import React from 'react';

const Paginate = ({pageNum, pageTotal, Back, Forward}) => {
  
  return (
    <p>
      Page {pageNum} of {pageTotal} <br/>
      {pageNum > 1 ? (
        <>{Back}<span className="m-2" /></> 
      ) : null}
      {pageNum < pageTotal ? Forward : null}
    </p>
  );
};

export default Paginate;
