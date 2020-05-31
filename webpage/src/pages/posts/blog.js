import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import { DateMenu, DateMenuItem } from '../../components/posts/DateMenu';

const BlogIndex = ({ data }) => (
  <Layout>
    <SEO title="Blog Posts Index" />
    <div className="flex flex-wrap">
      <div className="w-full px-4 py-12 md:w-1/2">
        <h1 className="text-2xl font-bold text-maroon-600">Blog Posts</h1>
        <div className="flex flex-wrap">
          <div className="items-center justify-center object-cover w-full mb-4 text-center md:pr-12 md:w-1/2">
            <DateMenu>
              <DateMenuItem date="20170322">
                <span>hi</span>
              </DateMenuItem>
              <DateMenuItem date="20170322">
                <span>hi</span>
              </DateMenuItem>
            </DateMenu>
          </div>
          <div className="items-center justify-center object-cover w-full mb-4 text-center md:pr-12 md:w-1/2">
            {JSON.stringify(data)}
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

export const query = graphql`
  {
    allSanityPostBlog(filter: { generic: { disable: { ne: false } } }) {
      nodes {
        _id
        author {
          ...fieldsPostAuthor
        }
        generic {
          ...fieldsPostGeneric
        }
      }
    }
  }
`;
export default BlogIndex;
