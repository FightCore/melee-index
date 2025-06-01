import { Component } from '@angular/core';
import { GET_POSTS } from '../../../queries/post-query';
import { map, Observable } from 'rxjs';
import { Post } from '../../../../models/post';
import { Apollo } from 'apollo-angular';
import { CarouselModule } from 'primeng/carousel';
import { PostCardComponent } from "../post-card/post-card.component";

@Component({
  selector: 'app-featured-post-carousel',
  imports: [CarouselModule, PostCardComponent],
  templateUrl: './featured-post-carousel.component.html',
  styleUrl: './featured-post-carousel.component.scss',
})
export class FeaturedPostCarouselComponent {
  featuredPosts: Post[] = [];

  constructor(private readonly apollo: Apollo) {
    this.getFeaturedPosts().subscribe((posts) => {
      this.featuredPosts = posts;
    });
  }

  private getFeaturedPosts(): Observable<Post[]> {
    return this.apollo
      .query({
        query: GET_POSTS,
        variables: {
          filter: {},
        },
      })
      .pipe(
        map((result) => {
          return (result.data as { data: { nodes: Post[] } }).data.nodes;
        })
      );
  }
}
