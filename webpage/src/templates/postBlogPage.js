import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';

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
