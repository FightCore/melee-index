import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthCallbackComponent } from './pages/auth-callback/auth-callback.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { ArticleComponent } from './pages/article/article.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'oauth-callback', component: AuthCallbackComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'posts/:id/:slug', component: ArticleComponent },
];
