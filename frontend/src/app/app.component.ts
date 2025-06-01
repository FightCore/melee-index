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
  isLightMode: boolean = true;
  constructor() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/home',
      },
      {
        'label': 'Posts',
        'icon': 'pi pi-file',
        routerLink: '/posts',
      },
      {
        label: 'Collections',
        icon: 'pi pi-star',
      },
      {
        label: 'Admin',
        icon: 'pi pi-cog',
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

  toggleDarkMode(): void {
    const element = document.querySelector('html');
    element?.classList.toggle('dark');
    this.isLightMode = !this.isLightMode;
  }
}
