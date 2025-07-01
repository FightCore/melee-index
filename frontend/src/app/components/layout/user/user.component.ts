import { afterNextRender, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserState, userFeature, UserState } from '../../../state/users/user.reducer';
import { TokenUser } from '../../../../models/auth/token-user';
import { AuthService } from '../../../services/auth/auth.service';
import { tap } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [ButtonModule, RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  user: TokenUser | null = null;

  constructor(private readonly store: Store, private readonly authService: AuthService) {
    afterNextRender(() => {
      this.authService.validateLogin();
    })
  }
  ngOnInit(): void {
    this.store.select(userFeature.selectUser).pipe(tap(console.log)).subscribe(user => this.user = user);
  }
  signout(): void {
    this.authService.logout();
  }
}
