import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Wrapper from '../components/Wrapper';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Wrapper>
      <h1 className="mb-4 text-2xl font-bold text-maroon-600">
        404: Page Not Found
      </h1>
      <p>The page you were looking for doesn't seem to exist.</p>
      <p className="mt-4">
        <Link className="font-bold underline text-maroon-600" to="/">
          Back to home page
        </Link>
      </p>
    </Wrapper>
  </Layout>
);

export default NotFoundPage;
