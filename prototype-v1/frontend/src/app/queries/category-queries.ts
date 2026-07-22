import { gql } from 'apollo-angular';

export const GET_CATEGORIES = gql`
  {
    data: categories {
      name
      slug
    }
  }
`;
