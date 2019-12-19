/* eslint-disable react/no-danger */
import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Wrapper from '../components/Wrapper';
import SEO from '../components/SEO';
import NotAvaliable from '../components/NotAvaliable';
import Paginate from '../components/paginate';

const categoryRoute = ({ data, pageContext, location }) => {
  const {
    productsPerPage,
    pageNum,
    totalPages,
    totalProducts
  } = pageContext;
  const { name, keywords, slug } = data.sanityCategory;
  const { disable } = data.sanityCategory.common || { disable: false };
  
  const PageNavigation = (
    <p>
      Total {name} products found: {totalProducts} <br />
      <Paginate
        pageNum={pageNum}
        pageTotal={totalPages}
        Back={
          <Link to={`/sanity/category/${slug.current}/page-${pageNum - 1}`}>
            Previous Page
          </Link>
        }
        Forward={
          <Link to={`/sanity/category/${slug.current}/page-${pageNum + 1}`}>
            Next Page
          </Link>
        }
      />
    </p>
  );
  return (
    <Layout>
      <SEO title={name} keywords={keywords || []} />
      <Wrapper>
        <h1 className="font-bold mb-4 text-2xl text-maroon-600">{name}</h1>
        {PageNavigation}
        {!disable ? 'hi' : (
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
        {PageNavigation}
      </Wrapper>
    </Layout>
  );
};

export const query = graphql`
  query sanity_categoryPageQuery(
    $categoryID: String
    $skip: Int!
    $productsPerPage: Int!
  ) {
    sanityCategory(_id: { eq: $categoryID }) {
      _id
      name
      slug {
        current
      }
      parent {
        id
      }
      description
      keywords
      common {
        disable
      }
    }
    allSanityProduct(
      filter: { common: { disable: { ne: true } } }
      skip: $skip
      limit: $productsPerPage
    ) {
      edges {
        node {
          name
          slug {
            current
          }
          common {
            disable
          }
          variants {
            name
            price
            discount_method
            discount_amount
            disable
          }
          description
          images {
            image {
              asset {
                fixed(height: 200) {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default categoryRoute;
