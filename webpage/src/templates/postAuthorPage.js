import React from 'react';
import {useStaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const PostAuthorPage = ({ data }) => {
  return (
    <Layout>
      <div>{JSON.stringify(data)}</div>
    </Layout>
  );
};

export default PostAuthorPage;
export const query = graphql`
  query AuthorByID($_id : String) {
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
