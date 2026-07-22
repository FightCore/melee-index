import { gql } from 'apollo-angular';

export const GET_LATEST_POSTS = gql`
  {
    data: posts(order: [{ publishedAt: DESC }], first: 4) {
      nodes {
        id
        documentId
        bookmarked
        slug
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
    data: posts(order: [{ publishedAt: DESC }], first: $filter) {
      nodes {
        id
        documentId
        bookmarked
        title
        slug
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
