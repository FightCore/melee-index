import { Component, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { PostsOverviewComponent } from './components/posts/posts-overview/posts-overview.component';
import { Apollo } from 'apollo-angular';
import { SearchBarComponent } from './components/search/search-bar/search-bar.component';
import { SearchBarService } from './services/search-bar/search-bar.service';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MenubarModule,
    SearchBarComponent,
    PostsOverviewComponent,
    SearchBarComponent,
    MessageModule,
    ButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  items: MenuItem[] | undefined;
  filter: any = {};

  constructor(
    private readonly apollo: Apollo,
    private searchBarService: SearchBarService
  ) {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
      },
      {
        label: 'Collections',
        icon: 'pi pi-star',
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
      },
    ];
    effect(() => {
      this.filter = this.searchBarService.filters$().filters;
    });
  }

  toggleDarkMode(): void {
    const element = document.querySelector('html');
    element?.classList.toggle('dark');
  }
}
