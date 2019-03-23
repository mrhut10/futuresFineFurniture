import React from 'react';
import { graphql, Link, StaticQuery } from 'gatsby';
import Image from './Image';
import Logo from '../../images/heroLogo.svg';

const Hero = () => (
  <StaticQuery
    query={graphql`
      query HeroQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div className="bg-white flex justify-center max-w-xl relative w-full">
        <div className="image-container opacity-75">
          <Image />
        </div>
        <div className="max-w-md mx-auto pb-32 py-4 px-4 relative text-center w-full">
          <Link to="/">
            <img
              className="w-auto"
              src={Logo}
              alt={data.site.siteMetadata.title}
            />
          </Link>
        </div>
      </div>
    )}
  />
);

export default Hero;
