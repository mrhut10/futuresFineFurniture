import React from 'react';
import { Card, Elevation } from '@blueprintjs/core';
import Layout from '../components/layout';
import Wrapper from '../components/wrapper';

import afterpayLogo from '../images/afterpay/afterpay_AP-RGB-sm.svg';
import afterpaySocial from '../images/afterpay/social-1080x1080-blue.png';
import visacard from '../images/paymentMethods/Dark Color/1.png';
import mastercard from '../images/paymentMethods/Dark Color/2.png';
import amexcard from '../images/paymentMethods/Dark Color/22.png';
import wallet from '../images/paymentMethods/australian-money-8746289.jpg';

const PaymentCard = ({ children }) => (
  <Card
    interactive
    elevation={Elevation.TWO}
    style={{ margin: '10px', maxWidth: '300px' }}
  >
    {children}
  </Card>
);

const PaymentPage = () => (
  <Layout>
    <Wrapper>
      <h1>Innovative Payment Options</h1>
      <p>
        Helpful and flexible payment options to help you get your quality
        furniture quicker
      </p>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <PaymentCard>
          <img src={afterpayLogo} height="50rem" alt="Afterpay" />
          <img src={afterpaySocial} alt="SHOP NOW, ENJOY NOW, PAY LATER" />
          <br />
          *instore
        </PaymentCard>
        <PaymentCard>
          <h3>Cards </h3>
          <img src={visacard} alt="VISA Card" />
          <img src={mastercard} alt="master Card" />
          <img src={amexcard} alt="amex card" />
          <br /> *instore and online
        </PaymentCard>
        <PaymentCard>
          <h3>Cash</h3>
          <img src={wallet} alt="cash in wallet" />
          <br /> *instore
        </PaymentCard>
      </div>
    </Wrapper>
  </Layout>
);

export default PaymentPage;
