import React from 'react';
import { graphql, Link, StaticQuery } from 'gatsby';
import Image from './Image';
import HeroImageBig from '../../images/heroLogo.svg';
import HeroImageSlim from '../../images/slimLogo.svg';


const HeroBig = ({data}) => (
  <div className="bg-white flex justify-center max-w-xl relative w-full">
        <div className="image-container opacity-75">
            <Image />
        </div>
        <div className="max-w-md mx-auto pb-32 py-4 px-4 relative text-center w-full">
          <Link to="/">
            <img
              className="w-auto"
              src={HeroImageBig}
              alt={data.site.siteMetadata.title}
            />
          </Link>
        </div>
      </div>
)


const HeroSlim = ({data}) => (
  /* insert some of Lukes Magic tailwind css stuff below */
  <div>
    <Link to="/">
      <img
        className="w-auto"
        src={HeroImageSlim}
        alt={data.site.siteMetadata.title}
      />
    </Link>
  </div>
)


const Hero = ({showHero=false}) => (
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
    render={
      data => showHero
        ? <HeroBig data={data}/>
        : <HeroSlim data={data}/>
    }
  />
);

export default Hero;
