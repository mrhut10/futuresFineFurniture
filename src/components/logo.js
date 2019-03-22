import React from 'react'
import logo from '../images/slimLogo.svg'
import hero from '../images/heroLogo.svg'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const HeroBackgroundImage = () => (
  <StaticQuery
    query={graphql`
      query { 
        placeholderImage: file(relativePath: {eq: "DINING_ALASKA.jpg"}){
          childImageSharp {
            fluid(maxWidth: 960){
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={
      data => <div style={{ backgroundColor: 'white' }}>
        <Img alt="Futures Fine Furniture and Bedding" style={{ opacity: '0.8' }} fluid={data.placeholderImage.childImageSharp.fluid} />
      </div>
    }
  />
)

const Logo = ({ showHero }) => (
  <div style={{ margin: '0 auto', textAlign: 'center', position: "relative" }}>
    {
      showHero
        ? <HeroBackgroundImage style={{ position: 'absolute', }} />
        : null
    }
    <img
      style={{
        marginBottom: '-0.2em',
        fontSize: ".1em",
        position: showHero ? 'absolute' : 'inherit',
        top: '0px',
        left: showHero ? '50%' : 'inherit',
        transform: showHero ? 'translateX(-50%)' : 'inherit',
        marginTop: '10px',
      }}
      src={showHero ? hero : logo} alt="Futures Fine Furniture & Bedding"
    />
  </div>
)

export default Logo