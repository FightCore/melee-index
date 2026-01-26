import { gql } from 'apollo-angular';

export const GET_LATEST_GLOSSARY_ITEMS = gql`
  {
    data: glossaryItems {
      documentId
      slug
      name
      description
      cover {
        url
      }
    }
  }
`;
