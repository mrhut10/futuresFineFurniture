import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
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
}) => (
  <div className="flex flex-col p-2 w-full sm:w-1/2 md:w-1/3">
    <div className="flex flex-1 flex-col border no-underline overflow-hidden rounded-lg shadow hover:shadow-lg">
      <Link className="bg-grey-darkest" to={slug || '/'} title={hoverText}>
        <h4 className="font-semibold mb-0 px-4 py-3 text-center text-grey-lighter hover:text-cream">
          {name}
        </h4>
      </Link>
      {comingSoon ? (
        <ComingSoon />
      ) : (
        <Link className="m-auto p-4" to={slug || '/'} title={hoverText}>
          {ImageComponent(images, `calc(${height}-30px)`)}
        </Link>
      )}
      <div>{Children}</div>
    </div>
  </div>
);

CategoryTitle.propTypes = {
  name: PropTypes.string,
  hoverText: PropTypes.string,
  slug: PropTypes.string,
  images: PropTypes.string,
  comingSoon: PropTypes.bool,
  height: PropTypes.number,
  Children: PropTypes.any,
};
/*

Children,
  name,
  hoverText,
  slug,
  images,
  comingSoon,
  height = 350,
  width = 250,\
  */
export default CategoryTitle;
