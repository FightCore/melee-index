import { Component, inject } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { CarouselModule } from 'primeng/carousel';
import { ListboxModule } from 'primeng/listbox';
import { FeaturedCollectionsComponent } from '@/app/components/collections/featured-collections/featured-collections.component';
import { LatestPostsComponent } from '@/app/components/post/latest-posts/latest-posts.component';
import { ArticlesService } from '@/app/services/articles/articles.service';
import { Article } from '@/models/post/article';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, MessageModule, ListboxModule, FeaturedCollectionsComponent, LatestPostsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly articlesService = inject(ArticlesService);
  latestPosts: Article[] = [];

  constructor() {
    this.articlesService.list().subscribe((posts) => {
      this.latestPosts = posts;
    });
  }
}
