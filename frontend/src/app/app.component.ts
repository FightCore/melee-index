import { afterNextRender, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AuthService } from './services/auth/auth.service';
import { SidenavComponent } from "./components/layout/sidenav/sidenav.component";
import { NavbarComponent } from "./components/layout/navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenubarModule, ButtonModule, SidenavComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly authService = inject(AuthService);

  constructor() {
    afterNextRender(() => {
      this.authService.validateLogin();
    });
  }

}
