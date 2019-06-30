import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import CategoriesAll from '../components/CategoriesAll';

const rangePage = () => (
  <Layout>
    <SEO title="Product Range" />
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-bold mb-4 text-2xl text-maroon-600">
        Pick a Category
      </h1>
      <CategoriesAll />
    </div>
  </Layout>
);

export default rangePage;
