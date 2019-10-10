/* eslint-disable react/no-danger */
import React from 'react';
import { graphql } from 'gatsby';
import queryString from 'query-string';
import Layout from '../components/Layout';
import Wrapper from '../components/Wrapper';
// import NotAvaliable from '../components/NotAvaliable';
import SEO from '../components/SEO';
// import { BulkProducts } from '../components/BulkProducts';
import {
  Products,
  CommonFilters,
  ProductGroupRender
} from '../components/products';
import NotAvaliable from '../components/NotAvaliable';

const categoryRoute = ({ data, pageContext, location }) => {
  const productsPerPage =
    Number(queryString.parse(location.search).productsPerPage) || 10;
  const pageNum = Number(queryString.parse(location.search).page || 1);
  const { disable } = data.sanityCategory.common || { disable: false };
  const products = Products({
    filters: [
      CommonFilters.hideDisable,
      node => node.category._id === pageContext.catigoryID,
    ],
    perPage: productsPerPage,
    pageNum: pageNum,
  });
  return (
    <Layout>
      <SEO
        title={data.sanityCategory.name}
        keywords={data.sanityCategory.keywords || []}
      />
      <Wrapper>
        <h1 className="font-bold mb-4 text-2xl text-maroon-600">
          {data.sanityCategory.name}
        </h1>
        {products && !disable ? (
          <ProductGroupRender products={products} />
        ) : (
          <NotAvaliable
            text={disable ? 'Not Avaliable' : 'Coming Soon'}
            subtext={
              disable
                ? `This Category of products is no longer avaliable or has been disabled`
                : `Check back here soon, new products added weekly`
            }
            showContact
          />
        )}
      </Wrapper>
    </Layout>
  );
};

export const query = graphql`
  query sanity_categoryPageQuery($catigoryID: String) {
    sanityCategory(_id: { eq: $catigoryID }) {
      _id
      name
      slug {current}
      parent {id}
      description
      keywords
      common {
        disable
      }
    }
    allSanityCategory {
      edges {
        node {
          _id
          name
          slug{current}
          parent {id}
          description
        }
      }
    }
  }
`;

export default categoryRoute;
