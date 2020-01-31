import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const PostNewsPage = ({ data }) => (
  <Layout>
    <div>{JSON.stringify(data)}</div>
  </Layout>
);

export default PostNewsPage;
export const query = graphql`
  query NewsById($_id: String!) {
    sanityPostNews(_id: { eq: $_id }) {
      ...fieldsPostNews
    }
  }
`;
