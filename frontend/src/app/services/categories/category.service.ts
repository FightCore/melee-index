import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Category } from '@/models/category';
import { map, Observable } from 'rxjs';
import { environment } from '@/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly apollo = inject(Apollo);
  private readonly httpClient = inject(HttpClient);

  getAll(useCache = true): Observable<Category[]> {
    return this.apollo
      .query({
        query: gql`
          {
            data: categories {
              id
              name
              color
            }
          }
        `,
        fetchPolicy: useCache ? 'cache-first' : 'no-cache',
      })
      .pipe(
        map((result) => {
          return (result.data as { data: Category[] }).data;
        })
      );
  }

  create(name: string, color: string): Observable<Category> {
    return this.httpClient.post<Category>(`${environment.apiUrl}/categories`, {
      name,
      color,
    });
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/categories/${id}`);
  }
}
