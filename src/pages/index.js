import React from 'react';
import { Link } from 'gatsby';

import { Card } from '@blueprintjs/core';
import Layout from '../components/layout';
import SEO from '../components/seo';
import RangeDisplay from '../components/range';

import Logo from '../images/slimLogo.svg';

const IndexPage = () => (
  <Layout showHero>
    <SEO
      title="Home"
      keywords={[
        `Quality Furniture`,
        `Mobility Products`,
        `kempsey`,
        `port macquarie`,
        `macksville`,
      ]}
    />
    <div className="p-4 w-full">
      <div className="flex justify-center w-full">
        <img className="h-12 max-w-lg mx-auto w-full" src={Logo} alt="" />
      </div>
      <div className="max-w-md mb-8 mx-auto p-4 text-xl w-full">
        <p className="mb-2">
          The widest range of new, end of line furniture, and mobility supplies.
        </p>
        <p>Everything you need to turn your space into a home!</p>
      </div>
      <div className="max-w-lg mb-8 mx-auto text-lg">
        <div className="flex flex-wrap -mx-2 mb-6">
          <div className="flex-1 mb-6 md:mb-0 px-2 text-white w-full md:w-1/2">
            <div className="flex flex-col items-center bg-grey-darkest p-4 rounded-lg">
              <h3>We ❤ Accessibility</h3>
              <hr className="mt-0" />
              <ul className="list-reset">
                <li className="mb-2">Lowest prices</li>
                <li className="mb-2">
                  <Link
                    className="text-cream hover:text-blue-lighter underline"
                    to="payment"
                  >
                    Flexible payments
                  </Link>
                </li>
                <li className="mb-2">Free delivery*</li>
              </ul>
              <p>
                <small>* promotion for Macleay Valley area (March & April 2019)</small>
              </p>
            </div>
          </div>
          <div className="flex mb-6 md:mb-0 px-2 text-white w-full md:w-1/2">
            <div className="flex flex-1 flex-col items-center bg-grey-darkest p-4 rounded-lg">
              <h3>We ❤ Quality</h3>
              <hr className="mt-0" />
              <ul className="list-reset">
                <li className="mb-2">Highest quality</li>
                <li className="mb-2">Best functionality</li>
                <li className="mb-2">Beauty to inspire</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-lg mb-4 mx-auto w-full">
        <h2 className="mb-2">Our Range</h2>
        <RangeDisplay.Categories />
      </div>
    </div>
  </Layout>
);

export default IndexPage;
