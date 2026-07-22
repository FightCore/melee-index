import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@/models/user';
import { UpdateUserModel } from '@/models/users/update-user.model';
import { environment } from '@/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);

  update(user: UpdateUserModel): Observable<User> {
    return this.http.put<User>(`${environment.apiUrl}/me`, user);
  }
}
