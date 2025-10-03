import { Component, inject } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { CarouselModule } from 'primeng/carousel';
import { ListboxModule } from 'primeng/listbox';
import { FeaturedCollectionsComponent } from '@/app/components/collections/featured-collections/featured-collections.component';
import { LatestPostsComponent } from '@/app/components/post/latest-posts/latest-posts.component';
import { ArticlesService } from '@/app/services/articles/articles.service';
import { Article } from '@/models/post/article';
import { PostService } from '@/app/services/post/post.service';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, MessageModule, ListboxModule, FeaturedCollectionsComponent, LatestPostsComponent],
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
