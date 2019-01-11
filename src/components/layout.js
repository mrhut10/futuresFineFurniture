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
            <Overlay isOpen={true} usePortal={true} style={{margin:'0 auto'}}>
            <Card className={classNames(Classes.CARD, Classes.elevation_4)}
              style={{ width: '300px', height:'300px',padding: 15, margin:'-150px -150px', width: '150', height:'150px', left: '50%', top:'50%', overflow:'none'}}
              interactive={true}
              elevation={Elevation.TWO}
            >
              <h1>Site Under Construction</h1>
              <span style={{fontSize:'1.23em'}}>
                We are very excited to be launching this site soon
                <br/>
                in the mean while, please visit us in store
              </span>
            </Card>
          </Overlay>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
