import { gql } from "apollo-angular";

export const GET_POSTS = gql`
  query GetPosts($filter: PostModelFilterInput) {
    data: posts(order: [{ createdAt: DESC }], where: $filter) {
      nodes {
        id
        createdAt
        updatedAt
        title
        summary
        url
        tags
        author {
          name
          image
        }
        category {
          name
          color
        }
        source {
          name
          url
        }
      }
    }
  }
`;
