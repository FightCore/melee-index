import { Component, effect } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { SearchBarService } from '../../services/search-bar/search-bar.service';
import { MessageModule } from 'primeng/message';
import { PostsOverviewComponent } from '../../components/posts/posts-overview/posts-overview.component';
import { SearchBarComponent } from '../../components/search/search-bar/search-bar.component';

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
  filter: any = {};
  constructor(
    private readonly searchBarService: SearchBarService
  ) {
    effect(() => {
      this.filter = this.searchBarService.filters$().filters;
    });
  }
}
