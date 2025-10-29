import { AuthService } from '@/app/services/auth/auth.service';
import { userFeature } from '@/app/state/users/user.reducer';
import { TokenUser } from '@/models/auth/token-user';
import { afterNextRender, AfterViewInit, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { tap } from 'rxjs';
import { UserComponent } from '../user/user.component';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    MenubarModule,
    ButtonModule,
    UserComponent,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    RouterModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
})
export class NavbarComponent implements AfterViewInit {
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
    this.store.select(userFeature.selectUser).subscribe((user) => {
      this.user = user;
      this.setMenubarItems();
    });
  }

  toggleDarkMode(): void {
    const element = document.querySelector('html');
    element?.classList.toggle('dark');
    this.isLightMode = !this.isLightMode;
  }

  private setMenubarItems(): void {
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
    ];
  }
}
