import { AfterViewInit, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { UserComponent } from '../user/user.component';
import { ButtonModule } from 'primeng/button';
import { TokenUser } from '@/models/auth/token-user';
import { Store } from '@ngrx/store';
import { userFeature } from '@/app/state/users/user.reducer';

@Component({
  selector: 'app-sidenav',
  imports: [MenuModule, BadgeModule, RippleModule, AvatarModule, RouterModule, ButtonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  standalone: true,
})
export class SidenavComponent implements AfterViewInit {
  items: MenuItem[] | undefined;
  isLightMode = true;
  user: TokenUser | null = null;
  private readonly store = inject(Store);

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

  private setMenubarItems(user: TokenUser | null): void {
    let profileSection = [];
    if (user) {
      profileSection = [
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
        {
          label: 'Settings',
          icon: 'pi pi-cog',
          routerLink: '/settings',
        },
				{
					label: 'Logout',
					icon: 'pi pi-sign-out',
					routerLink: '/logout',
				}
      ];
    } else {
      profileSection = [
        {
          label: 'Login',
          icon: 'pi pi-sign-in',
          routerLink: '/login',
        },
      ];
    }

    this.items = [
      {
        separator: true,
      },
      {
        label: 'Posts',
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
        ],
      },
      {
        separator: true,
      },
      {
        label: 'Profile',
        items: profileSection,
      },
      {
        separator: true,
      },
      {
        label: '',
        items: [
          {
            label: 'About',
						icon: 'pi pi-info-circle',
          },
          {
            label: 'Dark Mode',
            click: () => this.toggleDarkMode(),
            icon: 'pi ' + (this.isLightMode ? 'pi-moon' : 'pi-sun'),
          },
        ],
      },
      {
        separator: true,
      },
    ];
  }
}
