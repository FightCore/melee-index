import { gql } from 'apollo-angular';

export const GET_CHARACTERS = gql`
  {
    data: characters {
      name
      slug
    }
  }
`;
