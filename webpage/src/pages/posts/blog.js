import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import { DateMenu, DateMenuItem } from '../../components/posts/DateMenu';

const BlogIndex = ({ data }) => (
  <Layout>
    <SEO title="Blog Posts Index" />
    <div className="flex flex-wrap">
      <div className="px-4 py-12 w-full md:w-1/2">
        <h1 className="font-bold text-2xl text-maroon-600">Blog Posts</h1>
        <div className="flex flex-wrap">
          <div className="items-center justify-center mb-4 md:pr-12 object-cover text-center w-full md:w-1/2">
            <DateMenu>
              <DateMenuItem date="20170322">
                <span>hi</span>
              </DateMenuItem>
              <DateMenuItem date="20170322">
                <span>hi</span>
              </DateMenuItem>
            </DateMenu>
          </div>
          <div className="items-center justify-center mb-4 md:pr-12 object-cover text-center w-full md:w-1/2">
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
          name
        }
        generic {
          title
          slug {
            current
          }
          disable
          dateRelease
          tags
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
      }
    }
  }
`;
export default BlogIndex;
