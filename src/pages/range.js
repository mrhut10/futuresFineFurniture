import React from 'react';
import Layout from '../components/layout';
import Categories_all from '../components/Categories_all';


const rangePage = ({ data }) => (
  <Layout>
    <div className="max-w-lg mx-auto p-4">
      <h1>Full Range</h1>
      <Categories_all />
    </div>
  </Layout>
);

export default rangePage;
