import { graphql } from 'gatsby';

export const fieldsImageStdSize = graphql(`
  fragment fieldsImageStdSize on SanityImageAsset {
    fixed_sml: fixed(width: 200) {
      ...GatsbySanityImageFixed
    }
    fixed_mid: fixed(width: 400) {
      ...GatsbySanityImageFixed
    }
    fixed_lrg: fixed(width: 600) {
      ...GatsbySanityImageFixed
    }
    fluid_sml: fluid(maxWidth: 200) {
      ...GatsbySanityImageFluid
    }
    fluid_mid: fluid(maxWidth: 400) {
      ...GatsbySanityImageFluid
    }
    fluid_lrg: fluid(maxWidth: 600) {
      ...GatsbySanityImageFluid
    }
  }
`)

export const fieldsSanityCategory = graphql`
  fragment fieldsImageStdSize on SanityImageAsset {
    fixed_sml: fixed(width: 200) {
      ...GatsbySanityImageFixed
    }
    fixed_mid: fixed(width: 400) {
      ...GatsbySanityImageFixed
    }
    fixed_lrg: fixed(width: 600) {
      ...GatsbySanityImageFixed
    }
    fluid_sml: fluid(maxWidth: 200) {
      ...GatsbySanityImageFluid
    }
    fluid_mid: fluid(maxWidth: 400) {
      ...GatsbySanityImageFluid
    }
    fluid_lrg: fluid(maxWidth: 600) {
      ...GatsbySanityImageFluid
    }
  }
  fragment fieldsSanityCategory on SanityCategory {
    _id
    name
    slug {
      current
    }
    cover {
      asset {
        ...fieldsImageStdSize
      }
    }
    description
    keywords
    common {
      disable
    }
  }
`;

export const fieldsProductVariant = graphql`
  fragment fieldsProductVariant on SanityProductvariant {
    name
    price
    discount_method
    discount_amount
    disable
  }
`;

export const fieldsSanityProduct = graphql`
  fragment fieldsSanityProduct on SanityProduct {
    _id
    _createdAt
    _updatedAt
    name
    slug {
      current
    }
    category {
      ...fieldsSanityCategory
    }
    range {
      _id
      slug {
        current
      }
    }
    images {
      image {
        asset {
          ...fieldsImageStdSize
        }
      }
    }
    keywords
    common {
      disable
    }
    variants {
      ...fieldsProductVariant
    }
    description
  }
`;
