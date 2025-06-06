import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatePost } from '../../../models/admin/create-post';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private httpClient: HttpClient) {}

  create(post: CreatePost): Observable<unknown> {
    return this.httpClient.post(`${environment.apiUrl}/posts`, post);
  }
}
