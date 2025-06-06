import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatePost } from '../../../models/admin/create-post';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Post } from '../../../models/post';
import { Apollo } from 'apollo-angular';
import { GET_POSTS } from '../../queries/post-query';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private readonly httpClient: HttpClient, private readonly apollo: Apollo) {}

  getAll(useCache = true): Observable<Post[]> {
    return this.apollo
      .query({
        query: GET_POSTS,
        fetchPolicy: useCache ? 'cache-first' : 'no-cache',
      })
      .pipe(
        map((result) => {
          return (result.data as { data: {nodes: Post[]} }).data.nodes;
        })
      );
  }

  create(post: CreatePost): Observable<unknown> {
    return this.httpClient.post(`${environment.apiUrl}/posts`, post);
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/posts/${id}`);
  }
}
