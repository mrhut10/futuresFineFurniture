import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import CategoryTitle from './CategoryTile';

const R = require('ramda');

const CategoryCounts = R.compose(R.pathOr([], ['proCount', 'group']));

const GetSourceImages = R.compose(
  R.map(input => ({
    relativePath: R.pathOr('', ['node', 'relativePath'])(input),
    src: R.pathOr('', ['node', 'childImageSharp', 'fluid', 'src'])(input),
    srcSet: R.pathOr('', ['node', 'childImageSharp', 'fluid', 'srcSet'])(input),
  })),
  R.pathOr([], ['allFile', 'edges'])
);

const findImage = R.compose(
  R.last,
  R.split('/'),
  input => String(input),
  R.prop('images')
);

const Categories = () => (
  <StaticQuery
    query={graphql`
      {
        proCount: allMarkdownRemark(
          filter: { fields: { type: { eq: "product" } } }
        ) {
          group(field: frontmatter___Category) {
            totalCount
            fieldValue
          }
        }
        allMarkdownRemark(filter: { fields: { type: { eq: "productCats" } } }) {
          edges {
            node {
              frontmatter {
                title
                images
                order
                parent
                enabled
              }
              excerpt(pruneLength: 50)
              fields {
                slug
              }
            }
          }
        }
        allFile(filter: { sourceInstanceName: { eq: "contentImages" } }) {
          edges {
            node {
              relativePath
              childImageSharp {
                fluid(maxWidth: 400) {
                  src
                  srcSet
                }
              }
            }
          }
        }
      }
    `}
    render={queryData => (
      <div className="flex flex-wrap justify-center mx-auto w-full">
        <div className="flex flex-wrap -m-2">
          {R.compose(
            R.map(input => (
              <CategoryTitle
                key={input.title}
                name={input.title}
                slug={input.slug}
                hoverText={input.excerpt}
                images={[
                  R.compose(
                    R.find(R.propEq('relativePath', findImage(input))),
                    GetSourceImages
                  )(queryData),
                ]}
                comingSoon={!(input.count && input.count > 0)}
                height={300}
              />
            )),
            R.sort((a, b) => b.count - a.count),
            R.filter(
              R.allPass([R.propEq('parent', ''), R.propOr(false, 'enabled')])
            ),
            R.map(
              R.compose(
                input => ({
                  title: R.pathOr('', ['frontmatter', 'title'], input),
                  slug: R.pathOr('/404', ['fields', 'slug'], input),
                  excerpt: R.pathOr('', ['excerpt'], input),
                  images: R.pathOr([], ['frontmatter', 'images'], input),
                  count: R.compose(
                    R.propOr(0, 'totalCount'),
                    R.find(
                      R.propEq(
                        'fieldValue',
                        R.pathOr('', ['frontmatter', 'title'])(input)
                      )
                    ),
                    CategoryCounts
                  )(queryData),
                  parent: R.pathOr('', ['frontmatter', 'parent'])(input),
                  enabled: R.pathOr(false, ['frontmatter', 'enabled'])(input),
                }),
                R.pathOr({}, ['node'])
              )
            ),
            R.pathOr([], ['allMarkdownRemark', 'edges'])
          )(queryData)}
        </div>
      </div>
    )}
  />
);

Categories.propTypes = {};

export default Categories;
