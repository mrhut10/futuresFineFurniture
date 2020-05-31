import React from 'react';
import { MdCheckCircle } from 'react-icons/md';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Wrapper from '../components/Wrapper';
import afterpay from '../images/afterpay/social-1080x1080-blue.png';
import eftpos from '../images/paymentMethods/eftpos.svg';
import cash from '../images/paymentMethods/australian-money-8746289.jpg';

const PaymentPage = () => (
  <Layout>
    <SEO title="Payment" />
    <Wrapper>
      <h1 className="mb-4 text-2xl font-bold text-maroon-600">
        Innovative Payment Options
      </h1>
      <p>
        Helpful and flexible payment options to help you get your quality
        furniture quicker.
      </p>
      <hr />
      <ul className="flex flex-wrap mt-4 -mx-4">
        <CheckMark title="Afterpay" img={afterpay} />
        <CheckMark title="EFTPOS" img={eftpos} />
        <CheckMark title="Cash" img={cash} />
      </ul>
    </Wrapper>
  </Layout>
);

const CheckMark = ({ title, img }) => (
  <li className="w-full px-4 mb-8 sm:w-1/2 md:w-1/3">
    <div className="relative w-full p-4 bg-white rounded-lg shadow-md">
      <MdCheckCircle className="absolute bottom-0 left-0 mb-4 ml-4 rounded-full text-maroon-600" />
      <img
        className="object-cover object-center w-full h-56"
        src={img}
        alt=""
      />
      <h4 className="mt-4 text-sm font-bold tracking-wider text-center uppercase text-maroon-700">
        {title}
      </h4>
    </div>
  </li>
);
CheckMark.propTypes = {
  title: PropTypes.node,
  img: PropTypes.node,
};

export default PaymentPage;
