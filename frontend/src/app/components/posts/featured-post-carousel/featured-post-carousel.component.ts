import { Component, inject } from '@angular/core';
import { GET_POSTS } from '@/app/queries/post-query';
import { map, Observable } from 'rxjs';
import { Post } from '@/models/post';
import { Apollo } from 'apollo-angular';
import { CarouselModule } from 'primeng/carousel';
import { PostCardComponent } from "@/app/components/posts/post-card/post-card.component";

@Component({
  selector: 'app-featured-post-carousel',
  imports: [CarouselModule, PostCardComponent],
  templateUrl: './featured-post-carousel.component.html',
  styleUrl: './featured-post-carousel.component.scss',
})
export class FeaturedPostCarouselComponent {
  private readonly apollo = inject(Apollo);

  featuredPosts: Post[] = [];

  constructor() {
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
