import React from 'react';
import propTypes from 'prop-types';
import queryStrings from 'query-string';
import { navigate } from "gatsby";
import { changeObjectProb } from '../helpers';

const ProductsPerPage = ({location, options, defaultVal}) => {
  const productsPerPage = queryStrings.parse(location.search).productsPerPage || defaultVal;
  if (!options.includes(productsPerPage)) {
    options.push(productsPerPage);
    options.sort((a, b) => a - b);
  }
  return (
    <select
      // className="appearance-none bg-white block border border-gray-200 hover:border-gray-300 leading-tight focus:outline-none px-4 py-2 pr-8 rounded shadow focus:shadow-outline w-full"
      value={productsPerPage}
      onChange={e =>
        navigate(
          `${location.pathname}?${queryStrings.stringify(
            changeObjectProb(
              changeObjectProb(
                queryStrings.parse(location.search),
                'productsPerPage',
                e.target.value
              ),
              'page',
              1
            )
          )}`
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
  default: propTypes.number,
};

export default ProductsPerPage;
