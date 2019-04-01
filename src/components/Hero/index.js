import React from 'react';
import { graphql, Link, StaticQuery } from 'gatsby';
import Image from './Image';
import HeroImageBig from '../../images/heroLogo.svg';
import HeroImageSlim from '../../images/slimLogo.svg';


const HeroBig = ({data}) => (
  <div
    className="bg-white flex justify-center max-w-xl relative"
    style={{height:'23rem'}}
  >
        {/*hero image */}
        <div
          className="image-container flex absolute flex opacity-75"
        >
            <Image />
        </div>
        {/* overlay */}
        <div
          className="max-w-md m-auto absolute w-full object-center"
          style={{
            justifyContent:'center',
            alignItems:'center',
            textAlign:'center',
            margin:'0px auto',
            top:'50%',
            left:'50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
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
