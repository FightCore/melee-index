import { Injectable, inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { Source } from '@/models/source';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SourceService {
  private readonly apollo = inject(Apollo);
  private readonly httpClient = inject(HttpClient);


  getAll(useCache = true): Observable<Source[]> {
    return this.apollo
      .query({
        query: gql`
          {
            data: sources
            {
              id,
              name,
              description,
              url
            }
          }
        `,
        fetchPolicy: useCache ? 'cache-first' : 'no-cache',
      })
      .pipe(
        map((result) => {
          return (result.data as { data: Source[] }).data;
        })
      );
  }

    create(name: string, description: string, url: string): Observable<Source> {
      return this.httpClient.post<Source>(`${environment.apiUrl}/sources`, {
        name,
        description,
        url});
    }

    delete(id: string): Observable<void> {
      return this.httpClient.delete<void>(`${environment.apiUrl}/sources/${id}`);
    }
  }
