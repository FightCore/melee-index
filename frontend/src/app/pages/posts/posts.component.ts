import { Component, effect, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { SearchBarService } from '@/app/services/search-bar/search-bar.service';
import { MessageModule } from 'primeng/message';
import { PostsOverviewComponent } from '@/app/components/posts/posts-overview/posts-overview.component';
import { SearchBarComponent } from '@/app/components/search/search-bar/search-bar.component';

@Component({
  selector: 'app-posts',
  imports: [
    SearchBarComponent,
    PostsOverviewComponent,
    SearchBarComponent,
    MessageModule,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  private readonly searchBarService = inject(SearchBarService);

  filter: any = {};
  constructor() {
    effect(() => {
      this.filter = this.searchBarService.filters$().filters;
    });
  }
}
