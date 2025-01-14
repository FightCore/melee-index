import { Component, input } from '@angular/core';
import { Post } from '../../../../models/post';
import { PostCardComponent } from '../post-card/post-card.component';

@Component({
  selector: 'app-posts-overview',
  imports: [PostCardComponent],
  templateUrl: './posts-overview.component.html',
  styleUrl: './posts-overview.component.scss',
})
export class PostsOverviewComponent {
  readonly posts = input.required<Post[]>();
}
