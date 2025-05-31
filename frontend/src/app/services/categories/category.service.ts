import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Category } from '../../../models/category';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private readonly apollo: Apollo, private readonly httpClient: HttpClient) { }

  getAll(useCache = true): Observable<Category[]> {
    return this.apollo
      .query({
        query: gql`
          {
            data: categories
            {
              id,
              name,
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
    return this.httpClient.post<Category>('https://localhost:5002/categories', {
      name,
      color
    });
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`https://localhost:5002/categories/${id}`);
  }
}
