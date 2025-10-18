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
  imports: [MenuModule, BadgeModule, RippleModule, AvatarModule, RouterModule, ButtonModule, MenubarModule],
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
        label: '',
        items: [
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
            label: 'Characters',
            icon: 'pi pi-users',
            routerLink: '/characters',
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
        label: 'Frame data',
        items: [
          {
            label: 'Frame data',
            icon: 'pi pi-file',
            routerLink: '/frame-data',
          },
          {
            label: 'Glossary',
            icon: 'pi pi-book',
            routerLink: '/glossary',
          },
          {
            label: 'Crouch Cancel Calculator',
            icon: 'pi pi-calculator',
            routerLink: '/crouch-cancel-calculator',
          },
          {
            label: 'Animation Google Drive',
            icon: 'pi pi-google',
            routerLink: '/animation-google-drive',
          },
        ],
      },
      {
        separator: true,
      },
      {
        label: 'Others (TODO Rename)',
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
            icon: 'pi pi-money-bill',
            routerLink: '/donate',
          },
        ],
      },
    ];
  }
}
