import { afterNextRender, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-auth-callback',
  imports: [],
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.scss'
})
export class AuthCallbackComponent {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly auth: AuthService,
    private readonly router: Router
  ) {
    afterNextRender(() => {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.auth.saveToken(token);
      console.log(token);
      this.router.navigate(['']);
    } else {
      this.router.navigate(['/login']);
    }
    })
  }
}
