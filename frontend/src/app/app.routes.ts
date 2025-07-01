import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreatePostComponent } from './pages/admin/create-post/create-post.component';
import { ListAuthorsComponent } from './pages/authors/list-authors/list-authors.component';
import { ListSourcesComponent } from './pages/sources/list-sources/list-sources.component';
import { ListTagsComponent } from './pages/tags/list-tags/list-tags.component';
import { ListCategoriesComponent } from './pages/categories/list-categories/list-categories.component';
import { PostsComponent } from './pages/posts/posts.component';
import { ListPostsComponent } from './pages/admin/list-posts/list-posts.component';
import { AuthCallbackComponent } from './pages/auth-callback/auth-callback.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '',  component: HomeComponent},
  { path: 'posts', component: PostsComponent },
  {
    path: 'admin',
    children: [
      {
        path: 'create-post',
        component: CreatePostComponent,
      },
      {
        path: 'posts',
        component: ListPostsComponent
      }
    ],
  },
  { path: 'authors', component: ListAuthorsComponent },
  { path: 'sources', component: ListSourcesComponent },
  { path: 'tags', component: ListTagsComponent },
  { path: 'categories', component: ListCategoriesComponent },
  { path: 'oauth-callback', component: AuthCallbackComponent},
  { path: 'login', component: LoginComponent}
];
