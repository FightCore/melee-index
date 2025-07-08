import { Component, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { Post } from '@/models/post';
import { GET_POSTS } from '@/app/queries/post-query';
import { PostCardComponent } from "@/app/components/posts/post-card/post-card.component";
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-latest-post-carousel',
  imports: [PostCardComponent, CarouselModule],
  templateUrl: './latest-post-carousel.component.html',
  styleUrl: './latest-post-carousel.component.scss'
})
export class LatestPostCarouselComponent {
  private readonly apollo = inject(Apollo);

  latestPosts: Post[] = [];

  constructor() {
    this.getLatestPosts().subscribe((posts) => {
      this.latestPosts = posts;
    });
  }

  private getLatestPosts(): Observable<Post[]> {
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
