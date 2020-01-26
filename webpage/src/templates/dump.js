import React from 'react';
import moment from 'moment';

const Dump = alldata => (
  <div>
    test:
    <div>{moment(alldata.pageContext.min).format('YYYY')}</div>
    data Dump:
    <div>
      {Object.keys(alldata).map(key => {
        return (
          <p>
            {key} : {JSON.stringify(alldata[key])}
          </p>
        );
      })}
    </div>
  </div>
);

export default Dump;
