import React from 'react';
import propTypes from 'prop-types';
import queryStrings from 'query-string';
import { navigate } from "gatsby";
import { changeObjectProb } from '../helpers';

const ProductsPerPage = ({location, options, value}) => {
  return (
    <select
      // className="appearance-none bg-white block border border-gray-200 hover:border-gray-300 leading-tight focus:outline-none px-4 py-2 pr-8 rounded shadow focus:shadow-outline w-full"
      value={value}
      onChange={e =>
        navigate(location.pathname, {
          state: {
            pageNum: 1,
            productsPerPage: e.target.value,}
          },
        )
      }
    >
      {options.map(option => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

ProductsPerPage.propTypes = {
  location: propTypes.object,
  options: propTypes.arrayOf(propTypes.number),
  value: propTypes.number,
};

export default ProductsPerPage;
