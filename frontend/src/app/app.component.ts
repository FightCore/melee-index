import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { Post } from '../models/post';
import { posts } from '../data/post';
import { PostsOverviewComponent } from './components/posts/posts-overview/posts-overview.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenubarModule, PostsOverviewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  items: MenuItem[] | undefined;
  posts: Post[] = posts;

  ngOnInit() {
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
  }
}
