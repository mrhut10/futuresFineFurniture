import React from 'react';
import propTypes from 'prop-types';
import { graphql, Link, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';

import HeroImageBig from '../images/heroLogo.svg';
import HeroImageSlim from '../images/slimLogo.svg';

const HeroBig = ({ data }) => (
  <div className="bg-black flex justify-center relative">
    <Image
      className="h-full opacity-75 w-full"
      fluid={data.hero.childImageSharp.fluid}
    />
    <div className="absolute flex inset-0 items-center justify-center max-w-xl mx-auto object-center p-4 w-full">
      <img
        className="w-full"
        src={HeroImageBig}
        alt={data.site.siteMetadata.title}
      />
    </div>
  </div>
);

const HeroSlim = ({ data }) => (
  <div className="flex items-center pt-4">
    <img
      className="w-full"
      src={HeroImageSlim}
      alt={data.site.siteMetadata.title}
    />
  </div>
);

const Hero = ({ showHero = false }) => {
  const data = useStaticQuery(graphql`
    query {
      hero: file(relativePath: { eq: "DINING_ALASKA.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 5000) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <header className="bg-maroon-800 max-w-5xl mx-auto overflow-hidden relative rounded-t-lg w-full">
      <h1>
        <Link to="/">
          {showHero ? <HeroBig data={data} /> : <HeroSlim data={data} />}
        </Link>
      </h1>
    </header>
  );
};

HeroSlim.propTypes = {
  data: propTypes.any,
};
HeroBig.propTypes = {
  data: propTypes.any,
};
Hero.propTypes = {
  showHero: propTypes.bool,
};

export default Hero;
