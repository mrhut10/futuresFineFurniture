import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import NotAvaliable from './NotAvaliable';

// const ImageComponent = (image, maxHeight = '350px') => (
//   <img
//     style={{ maxHeight }}
//     alt="product"
//     src={image.src}
//     srcSet={image.srcSet}
//   />
// );

const CategoryTitle = ({
  children,
  name,
  hoverText,
  slug,
  images,
  comingSoon,
  // height = 350,
}) => (
  <div className="flex flex-col w-full p-2 sm:w-1/2 md:w-1/3">
    <div className="flex flex-col flex-1 overflow-hidden text-center no-underline bg-white rounded-lg shadow hover:shadow-lg">
      <Link
        className="flex flex-col flex-1 p-4 group"
        to={slug || '/'}
        title={hoverText}
      >
        {comingSoon ? (
          <NotAvaliable text="Coming Soon" showContact />
        ) : (
          <div className="relative w-full h-0 aspect-ratio-square">
            <div className="absolute inset-0 flex items-center justify-center">
              <Img
                alt="product"
                fixed={images?.[0]?.fixed ? images[0].fixed : null}
                fluid={images?.[0]?.fluid ? images[0].fluid : null}
                imgStyle={{ objectFit: 'contain' }}
                className="w-full h-full"
              />
            </div>
          </div>
        )}
        <h4 className="pt-4 text-sm font-bold leading-none tracking-wider uppercase text-maroon-700 group-hover:text-maroon-500">
          {name}
        </h4>
      </Link>
      {children}
    </div>
  </div>
);

CategoryTitle.propTypes = {
  name: PropTypes.string,
  hoverText: PropTypes.string,
  slug: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.object),
  comingSoon: PropTypes.bool,
  // height: PropTypes.number,
  children: PropTypes.any,
};

export default CategoryTitle;
