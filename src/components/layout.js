import React from 'react'
import classNames from "classnames";
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import TopMenu from '../components/topmenu';
import Header from './header'
import '../../node_modules/normalize.css'
import './layout.css'
import '../../node_modules/@blueprintjs/core/lib/css/blueprint.css'
import '../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css'
import { Button, Classes, Code, H3, H5, Intent, Overlay, Switch } from "@blueprintjs/core";
import { Card, Elevation } from "@blueprintjs/core";


const map = (width=200, height = 200) => `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3417.0768809607753!2d152.8386913141883!3d-31.07978838715898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b9ddf8643294fa9%3A0x4fb64c39e261278a!2sFUTURES+FINE+FURNITURE+%26+BEDDING+Pty+Ltd!5e0!3m2!1sen!2sau!4v1542370777195" width="${width}" height="${height}" frameborder="0" style="border:0" allowfullscreen></iframe>`

const Layout = ({ children, showHero, crumbs }) => (
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
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang="en" />
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
          <script src="https://cdn.snipcart.com/scripts/2.0/snipcart.js" id="snipcart" data-api-key={"YzUxMzk5NTItOThmOC00NzM3LWE5NmUtNGViMGVmNDNhNTdkNjM2NzY2ODMyMDY2NzQzNzg2"}></script>
          <link href="https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css" type="text/css" rel="stylesheet" />

        </Helmet>
        <div style={{
          background: data.site.siteMetadata.col_background,
          paddingTop: ".3rem"
        }}>
          <Header siteTitle={data.site.siteMetadata.title} showHero={showHero} />
          <TopMenu />
          <div
            style={{
              margin: '0 auto',
              maxWidth: 960,
              padding: '0px 1.0875rem 1.45rem',
              paddingTop: 0,
              background: 'white',
            }}
          >

            {children}
          </div>
        </div>
        <div>
          
    </div>
      </>
    )}
  />
)



Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
