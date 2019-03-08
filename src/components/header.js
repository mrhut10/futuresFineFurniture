import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Logo from './logo'

const Header = ({ siteTitle, showHero, heroImage  }) => (
  <header
  style={{
    margin: "10px auto",
    background: '#611821',
    marginBottom: '.2rem',
    borderRadius: '20px 20px 0px 0px',
    maxWidth: 960,
  }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          <Logo showHero={showHero} />
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
