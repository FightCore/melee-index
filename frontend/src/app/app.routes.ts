import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'oauth-callback',
    loadComponent: () => import('./pages/auth-callback/auth-callback.component').then((m) => m.AuthCallbackComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.component').then((m) => m.ProfileComponent),
  },
  {
    path: 'posts',
    loadComponent: () => import('./pages/posts/posts.component').then((m) => m.PostsComponent),
  },
  {
    path: 'posts/:id/:slug',
    loadComponent: () => import('./pages/article/article.component').then((m) => m.ArticleComponent),
  },
  {
    path: 'bookmarks',
    loadComponent: () => import('./pages/bookmarks/bookmarks.component').then((m) => m.BookmarksComponent),
  },
  {
    path: 'characters',
    loadComponent: () => import('./pages/characters/characters.component').then((m) => m.CharactersComponent),
  },
  {
    path: 'frame-data',
    loadComponent: () =>
      import('./pages/frame-data/overview/overview.component').then((m) => m.FrameDataOverviewComponent),
  },
  {
    path: 'frame-data/:id/:name',
    loadComponent: () =>
      import('./pages/frame-data/frame-data-character-page/frame-data-character-page.component').then(
        (m) => m.FrameDataCharacterPageComponent
      ),
  },
  {
    path: 'frame-data/:characterId/:characterName/moves/:moveId/:moveName',
    loadComponent: () =>
      import('./pages/frame-data/frame-data-move-page/frame-data-move-page.component').then(
        (m) => m.FrameDataMovePageComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
