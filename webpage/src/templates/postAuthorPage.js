import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
// import Img from 'gatsby-image';
// import SEO from '../components/SEO';

const PostAuthorPage = ({ data }) => (
  <Layout>
    <div>{JSON.stringify(data)}</div>
  </Layout>
);

export default PostAuthorPage;
export const query = graphql`
  query AuthorByID($_id: String) {
    sanityPostAuthor(_id: { eq: $_id }) {
      name
      body {
        _key
        _type
        style
        list
        sanityChildren {
          _key
          _type
          marks
          text
        }
      }
    }
  }
`;
