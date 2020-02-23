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
  cheapestProductInArray,
  cheapestVariantInProduct,
} from '../helpers/snipcart_sanityToJSON';
import { getAllParentNodes } from '../helpers/index';
import { NewBuyButton } from '../components/newSnipcart';

const categoryRoute = ({ data, pageContext }) => {
  const { productsPerPage, pageNum, totalPages, totalProducts, categoryID } = pageContext;
  const { name, keywords, slug } = data.Category;
  const { disable } = data.Category.common ?? { disable: false };
  const Products = R.compose(
    R.map(product => {
      const validVariants = R.once(
        R.compose(R.filter(activeVariant), R.prop('variants'))
      );

      const selectedVarient = R.compose(
        R.ifElse(R.isEmpty, () => undefined, R.head),
        R.sortBy(applyDiscountToVariant),
        validVariants
      )(product);
      const productLink = `/category/${product.category.slug.current}/${product.slug}`.toLowerCase();
      return (
        <CategoryTitle
          name={product.name}
          key={product.id}
          hoverText={product.name}
          slug={productLink}
          images={product.images.map(i => ({ fluid: i.fluid_mid }))}
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
    }),
    /*
    R.ifElse(
      () => name.toLowerCase() === 'bedroom',
      R.identity,
      R.sort((a, b) => {
        const findCheapestPrice = R.compose(
          // R.ifElse(R.isEmpty, R.always(0), R.head),
          applyDiscountToVariant,
          R.head,
          R.sortBy(applyDiscountToVariant),
          R.filter(activeVariant),
          R.prop('variants')
        );
        return findCheapestPrice(a) - findCheapestPrice(b);
      })
    ),
    */
    R.flatten,
    R.sortWith([
      // sort by cheapest group
      (gA, gB) => {
        const [pA, pB] = [gA, gB]
          .map(
            // adjust to cheapest priced product
            g =>
              applyDiscountToVariant(
                cheapestVariantInProduct(cheapestProductInArray(g))
              )
          )
          .map(
            // handle zero price event
            p => (p < 0.01 ? 1000000 : p)
          );
        return pA - pB;
      },
      // if group cheapest was zero price then make expensive
    ]),
    // group products if within same range
    R.groupWith((x, y) =>
      x.ranges.reduce(
        (acc, next) =>
          acc ? true : y.ranges.findIndex(range => range._id === next._id) >= 0,
        false
      )
    ),
    // define a product datatype
    R.map(
      R.compose(
        R.zipObj([
          'name',
          'id',
          'slug',
          'disable',
          'variants',
          'images',
          'ranges',
          'category',
        ]),
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
            R.map(R.compose(R.path(['image', 'asset']))),
            R.prop('images')
          ),
          // ranges
          R.prop('range'),
          // category
          R.prop('category')
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
        <h1 className="font-bold mb-4 text-2xl text-maroon-600">
          {[
            data.Category,
            ...getAllParentNodes(
              {
                fnGetParentNode: x => x.categoryParent,
                fnGetIdFromNode: x => (x ? x._id : null),
              },
              data.ParentCategories.nodes,
              data.Category,
            ),
          ].reduceRight((acc, next, i, allNodes) => {
            acc.push(
              <span>
                {allNodes.length === 0 || allNodes.length - 1 === i
                  ? ''
                  : ' \\ '}
                <Link to={`/category/${next.slug.current}`}>{next.name}</Link>
              </span>
            );
            return acc;
          }, [])}
        </h1>
        {
          // JSON.stringify(products)
        }
        {PageNavigation}
        <div>
          {data.IncludedCategories.nodes.filter(
            x => x.categoryParent && x.categoryParent._id === categoryID
          ).length > 0 ? (
            <>
              <span className="font-bold">Further Filter:</span>
              <div
                style={{
                  marginLeft: '-10px',
                  display: 'flex',
                  flexWrap: 'wrap',
                }}
              >
                {data.IncludedCategories.nodes
                  .filter(
                    x => x.categoryParent && x.categoryParent._id === categoryID
                  )
                  .map(x => (
                    <Link
                      className="cream-600 underline"
                      style={{
                        marginLeft: '10px',
                        display: 'block',
                        padding: '0 4px',
                      }}
                      to={`/category/${x.slug.current}`}
                    >
                      {x.name}
                    </Link>
                  ))}
              </div>
            </>
          ) : null}
        </div>
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
    $categoryID: String!
    $skip: Int!
    $productsPerPage: Int!
    $categoriesToInclude: [String]!
    $categoriesParents: [String]!
  ) {
    Category: sanityCategory(_id: { eq: $categoryID }) {
      ...fieldsSanityCategory
    }
    IncludedCategories: allSanityCategory(
      filter: { _id: { in: $categoriesToInclude } }
    ) {
      nodes {
        ...fieldsSanityCategory
      }
    }
    ParentCategories: allSanityCategory(
      filter: { _id: { in: $categoriesParents } }
    ) {
      nodes {
        ...fieldsSanityCategory
      }
    }
    allSanityProduct(
      filter: {
        category: { _id: { in: $categoriesToInclude } }
        common: { disable: { ne: true } }
      }
      skip: $skip
      limit: $productsPerPage
    ) {
      edges {
        node {
          ...fieldsSanityProduct
        }
      }
    }
  }
`;

export default categoryRoute;
