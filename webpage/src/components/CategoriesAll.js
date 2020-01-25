import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import * as R from 'ramda';
import CategoryTitle from './CategoryTile';

const queryToCategoryData = R.compose(
  R.map(
    R.compose(
      R.zipObj(['id', 'name', 'cover', 'slug']),
      R.juxt([
        // id
        R.prop('id'),
        // name
        R.prop('name'),
        // cover
        R.compose(
          R.zipObj(['src', 'srcSet']),
          R.juxt([
            R.path(['cover', 'asset', 'fluid', 'src']),
            R.path(['cover', 'asset', 'fluid', 'srcSet']),
          ])
        ),
        // slug
        R.compose(R.toLower, R.path(['slug', 'current'])),
      ]),
      R.prop('node')
    )
  ),
  R.path(['allSanityCategory', 'edges'])
);

const Categories = () => {
  return (
    <StaticQuery
      query={graphql`
        {
          allSanityCategory(
            filter: {
              common: { disable: { ne: true } }
              parentCategory: { id: { eq: null } }
            }
          ) {
            edges {
              node {
                id
                name
                slug {
                  current
                }
                cover {
                  asset {
                    fluid(maxWidth: 200) {
                      src
                      srcSet
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={queryData =>
        R.compose(
          categoryData => (
            <div className="flex flex-wrap justify-center mx-auto w-full">
              <div className="flex flex-wrap -m-2">
                {categoryData.map(input => (
                  <CategoryTitle
                    key={input.id}
                    name={input.name}
                    slug={`/category/${input.slug}`}
                    hoverText={input.name}
                    images={[input.cover]}
                    comingSoon={false}
                    height={300}
                  />
                ))}
              </div>
            </div>
          ),
          queryToCategoryData
        )(queryData)
      }
    />
  );
};

export default Categories;
