import { gql } from 'apollo-angular';

export const GET_LATEST_POSTS = gql`
  {
    data: posts(order: [{ publishedAt: DESC }], take: 4) {
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

export const GET_POSTS_WITH_FILTERS = gql`
  query GetPosts($filter: PostDataFilterInput) {
    data: posts(order: [{ publishedAt: DESC }], where: $filter) {
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
