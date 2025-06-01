import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatePost } from '../../../models/admin/create-post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private httpClient: HttpClient) {}

  create(post: CreatePost): Observable<unknown> {
    return this.httpClient.post('https://localhost:5002/posts', post);
  }
}
