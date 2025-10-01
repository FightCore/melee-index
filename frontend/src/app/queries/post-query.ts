import { gql } from 'apollo-angular';

export const GET_LATEST_POSTS = gql`
  {
    data: posts(where: { author: { name: { eq: "Bort" } } }) {
      items {
        id
        documentId
        title
        description
        cover {
          url
        }
        author {
          name
          avatar {
            url
            alternativeText
          }
        }
        category {
          name
          slug
        }
        characters {
          name
          slug
        }
      }
    }
  }
`;
