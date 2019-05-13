import React from 'react';
import { graphql } from 'gatsby';
import propTypes from 'prop-types';
import Layout from '../components/layout';
import Wrapper from '../components/wrapper';

const RangeRoute = ({ data }) => {
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

// markdownRemark(frontmatter: {title: {eq: $slug}}) {
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

RangeRoute.propTypes = {
  data: propTypes.any,
};

export default RangeRoute;
