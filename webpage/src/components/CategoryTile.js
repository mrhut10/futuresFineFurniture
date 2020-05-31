import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import NotAvaliable from './NotAvaliable';

const ImageComponent = (image, maxHeight = '350px') => (
  <img
    style={{ maxHeight }}
    alt="product"
    src={image.src}
    srcSet={image.srcSet}
  />
);

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
    <div className="bg-white flex flex-1 flex-col no-underline overflow-hidden rounded-lg shadow hover:shadow-lg text-center">
      <Link
        className="flex flex-1 flex-col group p-4"
        to={slug || '/'}
        title={hoverText}
      >
        {comingSoon ? (
          <NotAvaliable text='Coming Soon' showContact />
        ) : (
          <Img className="my-auto" 
            alt="product"
            fixed={images?.[0]?.fixed ? images[0].fixed : null}
            fluid={images?.[0]?.fluid ? images[0].fluid : null}
          />
        )}
        <h4 className="font-bold leading-none pt-4 text-maroon-700 group-hover:text-maroon-500 text-sm tracking-wider uppercase">
          {name}
        </h4>
      </Link>
      {Children}
    </div>
  </div>
);

CategoryTitle.propTypes = {
  name: PropTypes.string,
  hoverText: PropTypes.string,
  slug: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.object),
  comingSoon: PropTypes.bool,
  height: PropTypes.number,
  Children: PropTypes.any,
};

export default CategoryTitle;
