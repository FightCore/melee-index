import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { userFeature } from '@/app/state/users/user.reducer';
import { TokenUser } from '@/models/auth/token-user';
import { AuthService } from '@/app/services/auth/auth.service';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-user',
  imports: [ButtonModule, RouterModule, MenuModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly authService = inject(AuthService);

  @ViewChild('menu') menu: Menu | undefined;

  user: TokenUser | null = null;
  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.authService.validateLogin();
    this.store.select(userFeature.selectUser).subscribe((user) => {
      this.user = user;
      this.items = [
        { label: `Hello, ${this.user?.name || 'Error'}!`, escape: false, styleClass: 'font-bold' },
        { separator: true },
        {
          label: 'Profile',
          icon: 'pi pi-user',
          routerLink: '/profile',
        },
        {
          label: 'Bookmarks',
          icon: 'pi pi-user',
          routerLink: '/bookmarks',
        },
        {
          label: 'Sign out',
          icon: 'pi pi-sign-out',
          command: () => {
            this.signout();
          },
        },
      ];
    });
  }

  toggleMenu(event: Event) {
    this.menu?.toggle(event);
  }

  signout(): void {
    this.authService.logout();
  }
}
