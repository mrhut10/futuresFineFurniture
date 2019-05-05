import React from 'react';
import { Link } from 'gatsby';
// import { Card, Elevation } from '@blueprintjs/core';
import ComingSoon from './ComingSoon';

const ImageComponent = (input, maxheight = '350px') =>
  input ? <img style={{ maxheight }} alt="product" src={input} /> : null;

const CategoryTitle = ({
  Children,
  name,
  hoverText,
  slug,
  images,
  comingSoon,
  height = 350,
  width = 250,
}) => (
  <div className="flex flex-col p-2 md:w-1/3">
    <div className="flex flex-1 flex-col border no-underline overflow-hidden rounded-lg shadow hover:shadow-lg">
      <Link to={slug || '/'} title={hoverText}>
        <h4 className="mb-0 p-4 text-center text-grey-darkest text-sm tracking-wide uppercase">
          {name}
        </h4>
      </Link>
      {comingSoon ? (
        <ComingSoon />
      ) : images ? (
        <Link className="mb-auto p-4" to={slug || '/'} title={hoverText}>
          {ImageComponent(images, `calc(${height}-30px)`)}
        </Link>
      ) : (
        ''
      )}
      <div>{Children}</div>
    </div>
  </div>
);

export default CategoryTitle;
