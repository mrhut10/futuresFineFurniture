/* eslint-disable react/no-danger */
import React from 'react';
import { graphql, Link } from 'gatsby';
import * as R from 'ramda';
import Layout from '../components/Layout';
import Wrapper from '../components/Wrapper';
import SEO from '../components/SEO';
import { priceFormat } from '../helpers/index';
import NotAvaliable from '../components/NotAvaliable';
import Paginate from '../components/paginate';
import CategoryTitle from '../components/CategoryTile';
import {
  applyDiscountToVariant,
  activeVariant,
} from '../helpers/snipcart_sanityToJSON';
import { NewBuyButton } from '../components/newSnipcart';

const categoryRoute = ({ data, pageContext }) => {
  const { productsPerPage, pageNum, totalPages, totalProducts } = pageContext;
  const { name, keywords, slug } = data.sanityCategory;
  const { disable } = data.sanityCategory.common || { disable: false };
  const Products = R.compose(
    R.map(
      R.compose(
        product => {
          const validVariants = R.once(
            R.compose(R.filter(activeVariant), R.prop('variants'))
          );

          const selectedVarient = R.compose(
            R.ifElse(R.isEmpty, () => undefined, R.head),
            R.sortBy(applyDiscountToVariant),
            validVariants
          )(product);
          const productLink = `/category/${slug.current}/${product.slug}`.toLowerCase();
          return (
            <CategoryTitle
              name={product.name}
              key={product.id}
              hoverText={product.name}
              slug={productLink}
              images={product.images}
              Children={
                selectedVarient ? (
                  <div className="flex flex-col font-medium -mt-2 p-4 pt-0">
                    <p className="mb-4 text-sm">
                      {selectedVarient.price -
                        applyDiscountToVariant(selectedVarient) >
                      0.01 ? (
                        <Link className="text-blue-500" to={productLink}>
                          <p className="text-red-500 line-through">
                            {validVariants(product).length > 1
                              ? 'WAS FROM '
                              : 'WAS '}
                            {priceFormat.format(selectedVarient.price)}
                          </p>
                          <p className="text-blue-500">
                            {validVariants(product).length > 1
                              ? 'NOW FROM '
                              : 'NOW '}
                            {priceFormat.format(
                              applyDiscountToVariant(selectedVarient)
                            )}
                          </p>
                        </Link>
                      ) : (
                        <Link className="text-blue-500" to={productLink}>
                          {validVariants(product).length > 1 ? 'FROM ' : 'NOW '}
                          {priceFormat.format(selectedVarient.price)}
                        </Link>
                      )}
                    </p>
                  </div>
                ) : (
                  <Link to={productLink}>SEE MORE DETAILS</Link>
                )
              }
            />
          );
        },
        R.zipObj(['name', 'id', 'slug', 'disable', 'variants', 'images']),
        R.juxt([
          // name
          R.prop('name'),
          // id
          R.prop('_id'),
          // slug
          R.path(['slug', 'current']),
          // disable
          R.path(['common', 'disable']),
          // variants
          R.prop('variants'),
          // images
          R.compose(
            R.map(R.compose(R.path(['image', 'asset', 'fluid']))),
            R.prop('images')
          ),
        ]),
        R.prop('node')
      )
    ),
    R.path(['allSanityProduct', 'edges'])
  )(data);

  const PageNavigation = (
    <p>
      Total {name} products found: {totalProducts} <br />
      <Paginate
        pageNum={pageNum}
        pageTotal={totalPages}
        Back={
          <Link to={`/category/${slug.current}/page-${pageNum - 1}`}>
            Previous Page
          </Link>
        }
        Forward={
          <Link to={`/category/${slug.current}/page-${pageNum + 1}`}>
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
        {
          // JSON.stringify(products)
        }
        {PageNavigation}
        {!disable ? (
          <>
            <hr />
            <div className="flex flex-wrap  ` -mx-2 w-full">{Products}</div>
          </>
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
      parentCategory {
        id
      }
      description
      keywords
      common {
        disable
      }
    }
    allSanityProduct(
      filter: {
        category: { _id: { eq: $categoryID } }
        common: { disable: { ne: true } }
      }
      skip: $skip
      limit: $productsPerPage
    ) {
      edges {
        node {
          _id
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
                fluid(maxWidth: 300) {
                  src
                  srcSet
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
