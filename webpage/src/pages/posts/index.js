import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import { DateMenu, DateMenuItem } from '../../components/posts/DateMenu';

const PostIndex = () => {
  const data = {};
  return (
    <Layout>
      <div>
        hello there <br />
        {Object.keys(data).map(key => (
          <div>{data[key]}</div>
        ))}
      </div>
    </Layout>
  );
};

export default PostIndex;
