import React from 'react';

import Layout from '../components/layout';
import RangeDisplay from '../components/range';

const rangePage = ({ data }) => (
  <Layout>
    <div className="max-w-lg mx-auto p-4">
      <h1>Full Range</h1>
      <RangeDisplay.Categories />
    </div>
  </Layout>
);

export default rangePage;
