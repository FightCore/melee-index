import { Component, inject } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { CarouselModule } from 'primeng/carousel';
import { ListboxModule } from 'primeng/listbox';
import { LatestPostsComponent } from '@/app/components/post/latest-posts/latest-posts.component';
import { Article } from '@/models/post/article';
import { PostService } from '@/app/services/post/post.service';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, MessageModule, ListboxModule, LatestPostsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly postService = inject(PostService);
  latestPosts: Article[] = [];

  constructor() {
    this.postService.getLatest().subscribe((posts) => {
      this.latestPosts = posts;
    });
  }
}
