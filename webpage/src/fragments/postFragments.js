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

const fieldsPostBlogNews = typeName => graphql`
  fragment fieldsPost${typeName} on SanityPost${typeName} {
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

export const fieldsPostNews = fieldsPostBlogNews('News');
export const fieldsPostBlog = fieldsPostBlogNews('Blog');
