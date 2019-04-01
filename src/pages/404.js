import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Wrapper from '../components/wrapper';

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
