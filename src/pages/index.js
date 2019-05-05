import React from 'react';
import { Link } from 'gatsby';
import SEO from '../components/seo';
import Layout from '../components/layout';
import Logo from '../images/slimLogo.svg';
import Categories_all from '../components/Categories_all';

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
          Widest range of Furniture, Mattresses and Mobility Solutions within
          the Macleay Valley.
          <br />
        </p>
      </div>
      <div className="max-w-lg mb-8 mx-auto text-lg">
        <div className="flex flex-wrap -mx-2 mb-6">
          <div className="flex-1 mb-6 md:mb-0 px-2 text-white w-full md:w-1/2">
            <div className="flex flex-col items-center bg-grey-darkest p-4 rounded-lg">
              <h3>Highest Quality, Lowest Prices!</h3>
              <hr className="mt-0" />
              <p className="mb-2">
                Highest Quality, Loweset Prices,{' '}
                {
                  <Link
                    className="text-cream hover:text-blue-lighter underline"
                    to="payment"
                  >
                    Flexible Payments
                  </Link>
                }{' '}
                and Free Delivery* <br />
                <br />
                <small>* Macleay Valley area (March & April 2019)</small>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-lg mb-4 mx-auto w-full">
        <h2 className="mb-2">Our Range</h2>
        <Categories_all />
      </div>
    </div>
  </Layout>
);

export default IndexPage;
