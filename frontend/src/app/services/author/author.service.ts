import { Injectable, inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { Author } from '@/models/author';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private readonly apollo = inject(Apollo);
  private readonly httpClient = inject(HttpClient);


  getAll(useCache = true): Observable<Author[]> {
    return this.apollo
      .query({
        query: gql`
          {
              data: authors {
                  id
                  name
                  image
              }
          }
        `,
        fetchPolicy: useCache ? 'cache-first' : 'no-cache',
      })
      .pipe(
        map((result) => {
          return (result.data as { data: Author[] }).data;
        })
      );
  }

  create(name: string, imageUrl: string): Observable<Author> {
    return this.httpClient.post<Author>(`${environment.apiUrl}/authors`, {
      name,
      imageUrl});
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/authors/${id}`);
  }
}
