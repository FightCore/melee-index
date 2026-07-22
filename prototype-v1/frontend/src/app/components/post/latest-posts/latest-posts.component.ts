import { Article } from '@/models/post/article';
import { Component, input } from '@angular/core';
import { PostCardComponent } from '@/app/components/post/post-card/post-card.component';

@Component({
  selector: 'app-latest-posts',
  imports: [PostCardComponent],
  templateUrl: './latest-posts.component.html',
  styleUrl: './latest-posts.component.scss',
})
export class LatestPostsComponent {
  readonly posts = input.required<Article[]>();
}
