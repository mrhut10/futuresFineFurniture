/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from "gatsby"

import TopMenu from '../components/topmenu';
import Header from "./header"
import '../../node_modules/normalize.css'
import './layout.css'
import '../../node_modules/@blueprintjs/core/lib/css/blueprint.css'
import '../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css'

//import { Button, Classes, Code, H3, H5, Intent, Overlay, Switch } from "@blueprintjs/core";
//import { Card, Elevation } from "@blueprintjs/core";


const Layout = ({ children, showHero }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            col_background
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Furniture and Mobility Provider for the mid north coast' },
            { name: 'keywords', content: 'Mid North Coast, Furniture, Mobility, Timber, Beds, Lift Beds, Adjustable Beds, Lift Chairs, Mattress, Mattress\'s, Kempsey, Port Macquarie, Macksville, Coffs Harbour'},
          ]}
        >
          <html lang="en" />
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
          <script src="https://cdn.snipcart.com/scripts/2.0/snipcart.js" id="snipcart" data-api-key={"YzUxMzk5NTItOThmOC00NzM3LWE5NmUtNGViMGVmNDNhNTdkNjM2NzY2ODMyMDY2NzQzNzg2"}></script>
          <link href="https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css" type="text/css" rel="stylesheet" />
          <meta name="google-site-verification" content={process.env.GSITEVERIFY || 'goJNom09_gsf-UVMtPn0Lf0FyewffHdABHPT0y8a8so'} />
          <meta name="google-site-verification" content="eztyHPVm6MM-ShS5PDFtQ6kt0ikujFulLTK4bAU1mMg" />
        </Helmet>
        <div style={{
          background: data.site.siteMetadata.col_background,
          paddingTop: ".3rem"
        }}>
          <Header siteTitle={data.site.siteMetadata.title} showHero={showHero} />
          <TopMenu />
          <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
            background: "white"
          }}
        >
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built for Futures Fine Furniture and Bedding Pty Ltd
            {` `}
          </footer>
        </div>
        </div>
        
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
