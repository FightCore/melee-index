import { gql } from 'apollo-angular';

export const GET_AUTHORS = gql`
  {
    data: authors {
      name
      avatar {
        url
      }
    }
  }
`;
