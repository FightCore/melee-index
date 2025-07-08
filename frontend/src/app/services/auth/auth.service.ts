import { Injectable, inject } from '@angular/core';
import { TokenUser } from '@/models/auth/token-user';
import { Store } from '@ngrx/store';
import { jwtDecode } from "jwt-decode";
import { clearUser, setUser } from '@/app/state/users/user.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly store = inject(Store);

  private readonly tokenKey = 'jwt';

  validateLogin(): void {
    const token = this.getToken();
    if (!token) {
      return;
    }
    const user: TokenUser = jwtDecode(token);
    this.store.dispatch(setUser(user));
  }

  saveToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
    const user: TokenUser = jwtDecode(token);
    this.store.dispatch(setUser(user));
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    sessionStorage.removeItem(this.tokenKey);
    this.store.dispatch(clearUser());
  }
}
