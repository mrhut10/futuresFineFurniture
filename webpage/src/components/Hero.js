import React from 'react';
import propTypes from 'prop-types';
import { graphql, Link, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';

import HeroImageBig from '../images/heroLogo.svg';
import HeroImageSlim from '../images/slimLogo.svg';

const HeroBig = ({ data }) => (
  <div className="relative flex justify-center bg-black">
    <Image
      className="w-full h-full opacity-75"
      fluid={data.hero.childImageSharp.fluid}
    />
    <div className="absolute inset-0 flex items-center justify-center object-center w-full max-w-xl p-4 mx-auto">
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
      hero: file(relativePath: { eq: "hero.jpg" }) {
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
    <header className="relative w-full max-w-5xl mx-auto overflow-hidden bg-maroon-800 sm:rounded-t-lg">
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
