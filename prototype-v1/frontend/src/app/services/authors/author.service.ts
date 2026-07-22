import { GET_AUTHORS } from '@/app/queries/author-queries';
import { Author } from '@/models/post/blocks/author';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private readonly httpClient = inject(HttpClient);
  private readonly apollo = inject(Apollo);

  getAll(useCache = true): Observable<Author[]> {
    return this.apollo
      .query({
        query: GET_AUTHORS,
        fetchPolicy: useCache ? 'cache-first' : 'no-cache',
      })
      .pipe(
        map((result) => {
          return (result.data as { data: Author[] }).data;
        })
      );
  }
}
