import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
// import TermsPopup from './termsPopup';

import Head from './Head';
import Nav from './Nav';
import Hero from './Hero';
import '../css/tailwind.css';

const Layout = ({ children, showHero }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Head data={data} />
      <div className="flex flex-col min-h-screen font-sans text-base text-gray-700 bg-maroon-900 sm:px-4 sm:pt-4">
        <div className="relative flex flex-col w-full max-w-5xl m-auto rounded-lg shadow-2xl">
          <Hero showHero={showHero} />
          <Nav />
          <main className="flex flex-col w-full bg-gray-100 rounded-b-lg">
            {children}
          </main>
        </div>
        <footer className="flex flex-col flex-1 p-4 font-medium text-center text-white">
          <div className="mt-auto">
            Built for Futures Fine Furniture and Bedding Pty Ltd ©{' '}
            {new Date().getFullYear()} by{' '}
            <a
              className="font-bold text-cream-200"
              href="https://twitter.com/ahut10"
            >
              @ahut10
            </a>{' '}
            — a passionate JAMstack developer
          </div>
        </footer>
        {/* <TermsPopup /> */}
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  showHero: PropTypes.bool,
};

export default Layout;
