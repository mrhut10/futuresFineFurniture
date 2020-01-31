import { graphql } from 'gatsby';

export const fieldsPostGeneric = graphql`
  fragment fieldsPostGeneric on SanityPostGeneric {
    title
    slug {
      current
    }
    disable
    dateRelease
    tags
    body {
      sanityChildren {
        marks
        text
      }
      style
      list
    }
  }
`;

export const fieldsPostAuthor = graphql`
  fragment fieldsPostAuthor on SanityPostAuthor {
    _id
    name
    body {
      sanityChildren {
        marks
        text
      }
      style
      list
    }
  }
`;

export const fieldsPostNews = graphql`
  fragment fieldsPostNews on SanityPostNews {
    _id
    _createdAt
    _updatedAt
    generic {
      ...fieldsPostGeneric
    }
  }
`;
export const fieldsPostBlog = graphql`
  fragment fieldsPostBlog on SanityPostBlog {
    _id
    _createdAt
    _updatedAt
    author {
      ...fieldsPostAuthor
    }
    generic {
      ...fieldsPostGeneric
    }
  }
`;
