import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { Source } from '../../../models/source';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SourceService {
  constructor(private readonly apollo: Apollo, private readonly httpClient: HttpClient) {}

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
      return this.httpClient.post<Source>('https://localhost:5002/sources', {
        name,
        description,
        url});
    }

    delete(id: string): Observable<void> {
      return this.httpClient.delete<void>(`https://localhost:5002/sources/${id}`);
    }
  }
