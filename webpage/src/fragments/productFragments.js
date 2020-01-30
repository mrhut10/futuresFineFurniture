import { graphql } from 'gatsby';

export const fieldsProductVariant = graphql`
  fragment fieldsProductVariant on SanityProductvariant {
    name
    price
    discount_method
    discount_amount
    disable
  }
`;
