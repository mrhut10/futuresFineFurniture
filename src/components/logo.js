import React from 'react'
import logo from '../images/slimLogo.svg'
import hero from '../images/heroLogo.svg'
//import Stocked from './stokedText'

const Logo = ({ showHero }) => (
  <div style={{ margin: '0 auto', textAlign: 'center' }}>
    <img
      style={{
        marginBottom: '-0.2em',
        fontSize: ".1em",

      }}
      src={showHero ? hero : logo} alt="Futures Fine Furniture & Bedding"
    />
  </div>
)

export default Logo