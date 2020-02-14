import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import CategoryTitle from '../components/CategoryTile';

const sanityRange = () => (
  <Layout>
    <SEO title="Product Range" />
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-bold mb-4 text-2xl text-maroon-600">
        Pick a Category
      </h1>
      <div className="flex flex-wrap justify-center mx-auto w-full">
        <div className="flex flex-wrap -m-2">
          <StaticQuery
            query={query}
            render={queryData =>
              queryData.allSanityCategory.edges.map(({ node }) => (
                <CategoryTitle
                  key={node.name}
                  name={node.name}
                  slug={
                    node.slug
                      ? `/sanity/category/${node.slug.current}`.toLowerCase()
                      : ''
                  }
                  hoverText={node.description}
                  images={node.cover ? [node.cover.asset.fixed_sml] : null}
                  comingSoon={false}
                  height={300}
                />
              ))
            }
          />
        </div>
      </div>
    </div>
  </Layout>
);

export default sanityRange;
const query = graphql`
  {
    allSanityCategory(
      filter: {
        categoryParent: { _id: { eq: null } }
        common: { disable: { ne: true } }
      }
    ) {
      edges {
        node {
          ...fieldsSanityCategory
        }
      }
    }
  }
`;
