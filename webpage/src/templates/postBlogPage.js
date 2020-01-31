import React from 'react';
import {useStaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const PostBlogPage = ({ data }) => {
  return (
    <Layout>
      <div>{JSON.stringify(data)}</div>
    </Layout>
  );
};

export default PostBlogPage;
export const query = graphql`
  query BlogById($_id: String!) {
    sanityPostBlog(_id: { eq: $_id }) {
      author {
        name
        body {
          _key
          _type
          sanityChildren {
            _key
            _type
            marks
            text
          }
          style
          list
        }
      }
      generic {
        ...fieldsPostGeneric
      }
    }
  }
`;
