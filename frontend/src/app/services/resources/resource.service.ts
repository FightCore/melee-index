import { GET_ALL_RESOURCES } from '@/app/queries/resources-queries';
import { Resource } from '@/models/resources/resource';
import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private readonly apollo = inject(Apollo);

  getAll(useCache = true): Observable<Resource[]> {
    return this.apollo
      .query({
        query: GET_ALL_RESOURCES,
        fetchPolicy: useCache ? 'cache-first' : 'no-cache',
      })
      .pipe(
        map((result) => {
          return (result.data as { data: Resource[] }).data;
        })
      );
  }
}
