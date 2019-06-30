import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Wrapper from '../components/Wrapper';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Wrapper>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Wrapper>
  </Layout>
);

export default NotFoundPage;
