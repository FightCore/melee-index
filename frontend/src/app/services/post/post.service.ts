import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { GET_LATEST_POSTS } from '@/app/queries/post-query';
import { Article } from '@/models/post/article';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly httpClient = inject(HttpClient);
  private readonly apollo = inject(Apollo);

  getAll(useCache = true): Observable<Article[]> {
    return this.apollo
      .query({
        query: GET_LATEST_POSTS,
        fetchPolicy: useCache ? 'cache-first' : 'no-cache',
      })
      .pipe(
        map((result) => {
          return (result.data as { data: { items: Article[] } }).data.items;
        })
      );
  }
}
