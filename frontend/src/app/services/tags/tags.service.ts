import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(
    private readonly apollo: Apollo,
    private readonly httpClient: HttpClient
  ) {}

  getAll(useCache = true): Observable<string[]> {
    return this.apollo
      .query({
        query: gql`
          {
            data: tags
          }
        `,
        fetchPolicy: useCache ? 'cache-first' : 'no-cache',
      })
      .pipe(
        map((result) => {
          return (result.data as { data: string[] }).data;
        })
      );
  }

  create(name: string): Observable<string> {
    return this.httpClient.post(`${environment.apiUrl}/tags`, {name}, {
      responseType: 'text',
    });
  }

  delete(name: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/tags/${name}`);
  }
}
