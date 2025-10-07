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
