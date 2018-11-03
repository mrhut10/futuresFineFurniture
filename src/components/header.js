import React from 'react'
import { Link } from 'gatsby'
import Logo from './logo'


const Header = ({ siteTitle, showHero, heroImage }) => (
  <div //background for header
    style={{
      margin: "10px auto",
      background: '#611821',
      marginBottom: '.6rem',
      borderRadius: '20px',
      maxWidth: 960,
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '.3rem 1.0875rem',
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            textDecoration: 'none',
          }}
        >
          <Logo showHero={showHero} />
        </Link>
      </h1>
    </div>
  </div >
)

export default Header
