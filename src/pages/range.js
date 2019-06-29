import React from 'react';

import Layout from '../components/Layout';
import CategoriesAll from '../components/CategoriesAll';

const rangePage = () => (
  <Layout>
    <div className="max-w-lg mx-auto p-4">
      <h1>Pick a Category</h1>
      <CategoriesAll />
    </div>
  </Layout>
);

export default rangePage;
