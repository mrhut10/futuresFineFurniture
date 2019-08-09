import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Wrapper from '../components/Wrapper';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Wrapper>
      <h1 className="font-bold mb-4 text-2xl text-maroon-600">
        404: Page Not Found
      </h1>
      <p>The page you were looking for doesn't seem to exist.</p>
      <p className="mt-4">
        <Link className="font-bold text-maroon-600 underline" to="/">
          Back to home page
        </Link>
      </p>
    </Wrapper>
  </Layout>
);

export default NotFoundPage;
