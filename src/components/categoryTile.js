import React from 'react';
import { Link } from 'gatsby';
import { Card, Elevation } from '@blueprintjs/core';
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
    <div
      className="flex flex-1 flex-col border no-underline p-4 rounded-lg shadow hover:shadow-lg"
    >
      <Link
        to={slug || '/'}
        title={hoverText}
      >
        <h4 className="mb-4 text-blue-dark text-center text-xl">{name} &rarr;</h4>
      </Link>
        <div className="mb-auto">
          {comingSoon ? (
            <ComingSoon />
          ) : images ? (
            <Link
              to={slug || '/'}
              title={hoverText}
            >
              {ImageComponent(images, `calc(${height}-30px)`)}
            </Link>
          ) : (
            ''
          )}
        </div>
      <div>{Children}</div>
      <Link style={{width:'100%',textAlign:'right'}} to={slug||'/'} title={hoverText}>see more ...</Link>
    </div>
  </div>
);

export default CategoryTitle;
