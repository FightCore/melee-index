import { AfterViewInit, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { TokenUser } from '@/models/auth/token-user';
import { Store } from '@ngrx/store';
import { userFeature } from '@/app/state/users/user.reducer';
import { AuthService } from '@/app/services/auth/auth.service';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-sidenav',
  imports: [
    MenuModule,
    BadgeModule,
    RippleModule,
    AvatarModule,
    RouterModule,
    ButtonModule,
    MenubarModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  standalone: true,
})
export class SidenavComponent implements AfterViewInit {
  items: MenuItem[] | undefined;
  isLightMode = true;
  user: TokenUser | null = null;
  private readonly store = inject(Store);
  private readonly authService = inject(AuthService);

  ngAfterViewInit(): void {
    this.store.select(userFeature.selectUser).subscribe((user) => {
      this.user = user;
      this.setMenubarItems(user);
    });
  }

  toggleDarkMode(): void {
    const element = document.querySelector('html');
    element?.classList.toggle('dark');
    this.isLightMode = !this.isLightMode;
    this.setMenubarItems(this.user);
  }

  signout(): void {
    this.authService.logout();
  }

  private setMenubarItems(user: TokenUser | null): void {
    let profileSection: MenuItem | null = null;
    if (user) {
      profileSection = {
        label: 'Profile',
        items: [
          {
            label: 'Profile',
            icon: 'pi pi-user',
            routerLink: '/profile',
          },
          {
            label: 'Bookmarks',
            icon: 'pi pi-bookmark',
            routerLink: '/bookmarks',
          },
        ],
      };
    }

    this.items = [
      {
        separator: true,
      },
      {
        label: 'Guides',
        items: [
          {
            label: 'Starter Guides',
            icon: 'pi pi-play-circle',
            routerLink: '/posts',
          },
          {
            label: 'Fundamentals',
            icon: 'pi pi-book',
            routerLink: '/posts',
          },
          {
            label: 'Advanced Techniques',
            icon: 'pi pi-bolt',
            routerLink: '/posts',
          },
          {
            label: 'Characters Guides',
            icon: 'pi pi-users',
            routerLink: '/characters',
          },
          {
            label: 'Matchups',
            icon: 'pi pi-arrows-h',
            routerLink: '/matchups',
          },
          {
            label: 'Training & Practice',
            icon: 'pi pi-replay',
            routerLink: '/posts',
          },
        ],
      },
      {
        separator: true,
      },
      ...(profileSection
        ? [
            profileSection,
            {
              separator: true,
            },
          ]
        : []),
      {
        label: 'Tools & Data',
        items: [
          {
            label: 'Glossary',
            icon: 'pi pi-book',
            routerLink: '/glossary',
          },
        ],
      },
      {
        separator: true,
      },
      {
        label: 'Resources',
        items: [
          {
            label: 'About',
            icon: 'pi pi-info-circle',
            routerLink: '/about',
          },
          {
            label: 'Sources',
            icon: 'pi pi-github',
            routerLink: '/credits',
          },
          {
            label: 'Donate',
            icon: 'pi pi-heart',
            routerLink: '/donate',
          },
        ],
      },
    ];
  }
}
