import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

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
      <div className="bg-maroon-900 flex flex-col font-sans min-h-screen sm:px-4 sm:pt-4 text-base text-gray-700">
        <div className="flex flex-col max-w-5xl m-auto relative rounded-lg shadow-2xl w-full">
          <Hero showHero={showHero} />
          <Nav />
          <main className="flex flex-col bg-gray-100 rounded-b-lg w-full">
            {children}
          </main>
        </div>
        <footer className="flex flex-1 flex-col font-medium p-4 text-center text-white">
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
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  showHero: PropTypes.bool,
};

export default Layout;
