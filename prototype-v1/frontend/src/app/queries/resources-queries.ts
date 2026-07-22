import { gql } from 'apollo-angular';

export const GET_ALL_RESOURCES = gql`
  {
    data: resources {
      name
      slug
      description
      url
      icon {
        url
      }
      preview {
        url
      }
      characters {
        name
        slug
      }
      source {
        name
        description
      }
      submitter: author {
        name
      }
    }
  }
`;
