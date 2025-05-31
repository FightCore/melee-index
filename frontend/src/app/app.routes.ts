import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreatePostComponent } from './pages/admin/create-post/create-post.component';
import { ListAuthorsComponent } from './pages/authors/list-authors/list-authors.component';
import { ListSourcesComponent } from './pages/sources/list-sources/list-sources.component';
import { ListTagsComponent } from './pages/tags/list-tags/list-tags.component';
import { ListCategoriesComponent } from './pages/categories/list-categories/list-categories.component';

export const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: 'posts', component: HomeComponent },
  {
    path: 'admin',
    children: [
      {
        path: 'create',
        component: CreatePostComponent,
      },
    ],
  },
  { path: 'authors', component: ListAuthorsComponent },
  { path: 'sources', component: ListSourcesComponent },
  { path: 'tags', component: ListTagsComponent },
  { path: 'categories', component: ListCategoriesComponent },
];
