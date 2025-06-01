import {
  Component,
  effect,
  input,
  signal,
  WritableSignal,
} from '@angular/core';
import { Post } from '../../../../models/post';
import { PostCardComponent } from '../post-card/post-card.component';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';

const GET_POSTS = gql`
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

@Component({
  selector: 'app-posts-overview',
  imports: [PostCardComponent],
  templateUrl: './posts-overview.component.html',
  styleUrl: './posts-overview.component.scss',
})
export class PostsOverviewComponent {
  posts: WritableSignal<Post[] | undefined> = signal([]);
  readonly filter = input.required<any>();

  constructor(private readonly apollo: Apollo) {
    effect(() => {
      let filter = {};
      if (this.filter()) {
        filter = this.filter();
      }

      this.queryPosts(filter).subscribe((posts) => {
        this.posts.set(posts);
      });
    });
  }

  private queryPosts(filter: any): Observable<Post[]> {
    return this.apollo
      .query({
        query: GET_POSTS,
        variables: {
          filter: filter,
        },
      })
      .pipe(
        map((result) => {
          return (result.data as { data: { nodes: Post[] } }).data.nodes;
        })
      );
  }
}
