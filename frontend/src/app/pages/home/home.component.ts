import { Component, effect } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { PostsOverviewComponent } from '../../components/posts/posts-overview/posts-overview.component';
import { SearchBarComponent } from '../../components/search/search-bar/search-bar.component';
import { Apollo } from 'apollo-angular';
import { SearchBarService } from '../../services/search-bar/search-bar.service';

@Component({
  selector: 'app-home',
  imports: [
    SearchBarComponent,
    PostsOverviewComponent,
    SearchBarComponent,
    MessageModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  filter: any = {};
  constructor(
    private readonly apollo: Apollo,
    private searchBarService: SearchBarService
  ) {
    effect(() => {
      this.filter = this.searchBarService.filters$().filters;
    });
  }
}
