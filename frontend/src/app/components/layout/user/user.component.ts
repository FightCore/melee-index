import { afterNextRender, Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { userFeature } from '@/app/state/users/user.reducer';
import { TokenUser } from '@/models/auth/token-user';
import { AuthService } from '@/app/services/auth/auth.service';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [ButtonModule, RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly authService = inject(AuthService);

  user: TokenUser | null = null;

  constructor() {
    afterNextRender(() => {
      this.authService.validateLogin();
    });
  }
  ngOnInit(): void {
    this.store.select(userFeature.selectUser).subscribe((user) => (this.user = user));
  }
  signout(): void {
    this.authService.logout();
  }
}
