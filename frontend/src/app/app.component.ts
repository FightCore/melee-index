import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenubarModule, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  items: MenuItem[] | undefined;
  constructor() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/',
      },
      {
        label: 'Collections',
        icon: 'pi pi-star',
      },
      {
        label: 'Authors',
        icon: 'pi pi-users',
        routerLink: '/authors',
      },
      {
        label: 'Sources',
        icon: 'pi pi-users',
        routerLink: '/sources',
      },
      {
        label: 'Tags',
        icon: 'pi pi-users',
        routerLink: '/tags',
      },
      {
        label: 'Categories',
        icon: 'pi pi-users',
        routerLink: '/categories',
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
      },
    ];
  }

  toggleDarkMode(): void {
    const element = document.querySelector('html');
    element?.classList.toggle('dark');
  }
}
