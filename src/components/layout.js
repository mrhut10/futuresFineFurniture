import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import TopMenu from './topmenu';
import Header from './header';
import '../css/tailwind.css';
import '../css/typography.css';

const Layout = ({ children, showHero }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: 'description',
              content:
                'Furniture and Mobility Provider for the mid north coast',
            },
            {
              name: 'keywords',
              content:
                "Mid North Coast, Furniture, Mobility, Timber, Beds, Lift Beds, Adjustable Beds, Lift Chairs, Mattress, Mattress's, Kempsey, Port Macquarie, Macksville, Coffs Harbour",
            },
          ]}
        >
          <html lang="en" />
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js" />
          <script
            src="https://cdn.snipcart.com/scripts/2.0/snipcart.js"
            id="snipcart"
            data-api-key="YzUxMzk5NTItOThmOC00NzM3LWE5NmUtNGViMGVmNDNhNTdkNjM2NzY2ODMyMDY2NzQzNzg2"
          />
          <link
            href="https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css"
            type="text/css"
            rel="stylesheet"
          />
        </Helmet>
        <div className="bg-grey-darker flex flex-col font-sans min-h-screen py-3 text-base text-grey-darkest">
          <Header showHero={showHero} />
          <TopMenu />
          <main className="bg-white flex-1 max-w-xl mx-auto rounded-b-lg w-full">
            {children}
          </main>
          <footer className="p-4 text-center text-white">
            Built for Futures Fine Furniture and Bedding Pty Ltd ©{' '}
            {new Date().getFullYear()} by{' '}
            <a className="text-cream" href="https://twitter.com/ahut10">
              @ahut10
            </a>{' '}
            — a passionate JAMstack developer
          </footer>
        </div>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
