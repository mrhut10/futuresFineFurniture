import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import logo from '../images/slimLogo.svg';
import hero from '../images/heroLogo.svg';

const HeroBackgroundImage = () => (
  <StaticQuery
    query={graphql`
      query {
        placeholderImage: file(relativePath: { eq: "DINING_ALASKA.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 960) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <div className="bg-white flex h-64 items-center justify-center relative w-full">
        <div className="image-container opacity-50">
          <Img
            alt="Futures Fine Furniture and Bedding"
            style={{ opacity: '0.8' }}
            fluid={data.placeholderImage.childImageSharp.fluid}
          />
        </div>
      </div>
    )}
  />
);

const Logo = ({ showHero }) => (
  <div style={{ margin: '0 auto', textAlign: 'center', position: 'relative' }}>
    {showHero ? <HeroBackgroundImage style={{ position: 'absolute' }} /> : null}
    <img
      style={{
        marginBottom: '-0.2em',
        fontSize: '.1em',
        position: showHero ? 'absolute' : 'inherit',
        top: '0px',
        left: showHero ? '50%' : 'inherit',
        transform: showHero ? 'translateX(-50%)' : 'inherit',
        marginTop: '10px',
      }}
      src={showHero ? hero : logo}
      alt="Futures Fine Furniture & Bedding"
    />
  </div>
);

export default Logo;
