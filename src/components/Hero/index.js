import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import Image from './Image';
import HeroImageBig from '../../images/heroLogo.svg';
import HeroImageSlim from '../../images/slimLogo.svg';

const HeroBig = ({ data }) => (
  <div
    className="bg-maroon flex justify-center max-w-xl relative"
    style={{ height: '23rem' }}
  >
    <Image />
    <div
      className="max-w-md m-auto absolute w-full object-center p-4"
      // style={{
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   textAlign: 'center',
      //   margin: '0px auto',
      //   top: '50%',
      //   left: '50%',
      //   transform: 'translate(-50%, -50%)',
      // }}
    >
      <img
        className="w-auto"
        src={HeroImageBig}
        alt={data.site.siteMetadata.title}
      />
    </div>
  </div>
);

const HeroSlim = ({ data }) => (
  /* insert some of Luke's Magic Tailwind CSS stuff below */
  <div className="flex items-center">
    <img
      className="w-full"
      src={HeroImageSlim}
      alt={data.site.siteMetadata.title}
    />
  </div>
);

const Hero = ({ showHero = false }) => (
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
    render={data =>
      showHero ? <HeroBig data={data} /> : <HeroSlim data={data} />
    }
  />
);

export default Hero;
