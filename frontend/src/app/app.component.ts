import { afterNextRender, AfterViewInit, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { UserComponent } from './components/layout/user/user.component';
import { TokenUser } from '@/models/auth/token-user';
import { Store } from '@ngrx/store';
import { AuthService } from './services/auth/auth.service';
import { userFeature } from './state/users/user.reducer';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenubarModule, ButtonModule, UserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  private readonly store = inject(Store);
  private readonly authService = inject(AuthService);

  items: MenuItem[] | undefined;
  isLightMode = true;
  user: TokenUser | null = null;
  constructor() {
    afterNextRender(() => {
      this.authService.validateLogin();
    });
    this.setMenubarItems();
  }

  ngAfterViewInit(): void {
    this.store
      .select(userFeature.selectUser)
      .pipe(tap(console.log))
      .subscribe((user) => {
        this.user = user;
        this.setMenubarItems(user);
      });
  }

  toggleDarkMode(): void {
    const element = document.querySelector('html');
    element?.classList.toggle('dark');
    this.isLightMode = !this.isLightMode;
  }

  private setMenubarItems(user: TokenUser | null = null): void {
    const overrideUser = user ?? this.user;
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/',
      },
      {
        label: 'Posts',
        icon: 'pi pi-file',
        routerLink: '/posts',
      },
      {
        label: 'Collections',
        icon: 'pi pi-star',
      },
      {
        label: 'Admin',
        icon: 'pi pi-cog',
        visible: overrideUser?.admin ?? false,
        items: [
          {
            label: 'Authors',
            icon: 'pi pi-users',
            routerLink: '/authors',
          },
          {
            label: 'Categories',
            icon: 'pi pi-folder',
            routerLink: '/categories',
          },
          {
            label: 'Posts',
            icon: 'pi pi-pencil',
            routerLink: '/admin/posts',
          },
          {
            label: 'Sources',
            icon: 'pi pi-sitemap',
            routerLink: '/sources',
          },
          {
            label: 'Tags',
            icon: 'pi pi-hashtag',
            routerLink: '/tags',
          },
        ],
      },
    ];
  }
}
