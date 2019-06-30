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
      <h1 className="font-bold mb-4 text-2xl text-maroon-600">
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
  <li className="mb-8 px-4 w-full sm:w-1/2 md:w-1/3">
    <div className="bg-white p-4 relative rounded-lg shadow-md w-full">
      <MdCheckCircle className="absolute bottom-0 left-0 mb-4 ml-4 rounded-full text-maroon-600" />
      <img
        className="h-56 object-cover object-center w-full"
        src={img}
        alt=""
      />
      <h4 className="font-bold mt-4 text-center text-maroon-700 text-sm tracking-wider uppercase">
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
