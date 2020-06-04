import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

import Logo from '../images/slimLogo.svg';
import CategoriesAll from '../components/CategoriesAll';
import ProductsRecentlyModified from '../components/ProductsRecentlyModified';
// import DiscountedProducts from '../components/DiscountedProducts';

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
    <div className="w-full max-w-4xl px-4 py-12 mx-auto">
      <div className="w-full mx-auto">
        <img src={Logo} alt="" />
      </div>
      <div className="w-full mx-auto my-8 text-xl text-center">
        <p className="mb-16">
          Highest Quality, Lowest Prices,{' '}
          {
            <Link
              className="font-bold underline hover:text-cream-600"
              to="/payment"
            >
              Flexible Payments
            </Link>
          }{' '}
          <br />
          <small>
            The widest range of Furniture, Mattresses and Mobility Solutions
            within the Macleay Valley.
          </small>
        </p>
      </div>
      {/*
        <div className="mx-auto mb-8 text-lg">
          <div className="flex flex-wrap mb-6 -mx-2">
            <div className="flex-1 w-full px-2 mb-6 md:mb-0 md:w-1/2">
              <div className="flex flex-col items-center p-4 border rounded-lg shadow border-cream-200 bg-cream-100 text-cream-700">
                <h3 className="text-2xl font-bold">
                  Massive floorstock Promotion
                </h3>
                <hr className="mt-1 bg-cream-300" />
                <p className="mb-2">
                  10% discount of floor stocked product's <br />
                  <small>*orders over $1000 for August 2019 Only</small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <br />
      */}
      <hr className="bg-gray-200" />
      <div className="w-full mx-auto mb-4">
        {/*
          <h2 className="mb-4 text-2xl font-bold text-maroon-600">Latest Specials</h2>
          <DiscountedProducts />
        */}
        <h2 className="mb-4 text-2xl font-bold text-maroon-600">
          {/* <Link to="/new"> */}
          New Products
          {/* </Link> */}
        </h2>
        <ProductsRecentlyModified quantity={3} />
      </div>
      <div className="w-full mx-auto mb-4">
        <h2 className="mb-4 text-2xl font-bold text-maroon-600">
          Our Full Range
        </h2>
        <CategoriesAll />
      </div>
    </div>
  </Layout>
);

export default IndexPage;
