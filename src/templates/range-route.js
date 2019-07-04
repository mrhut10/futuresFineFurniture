/* eslint-disable react/no-danger */
import React from 'react';
import { graphql } from 'gatsby';
import propTypes from 'prop-types';
import Layout from '../components/Layout';
import Wrapper from '../components/Wrapper';

const rangeRoute = ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <Wrapper>
        <div>
          <h1>{post.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </Wrapper>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

rangeRoute.propTypes = {
  data: propTypes.any,
};

export default rangeRoute;
