import { GET_CATEGORIES } from '@/app/queries/category-queries';
import { Category } from '@/models/post/category';
import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly apollo = inject(Apollo);

  getAll(useCache = true): Observable<Category[]> {
    return this.apollo
      .query({
        query: GET_CATEGORIES,
        fetchPolicy: useCache ? 'cache-first' : 'no-cache',
      })
      .pipe(
        map((result) => {
          return (result.data as { data: Category[] }).data;
        })
      );
  }
}
