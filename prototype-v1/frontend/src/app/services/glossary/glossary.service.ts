import { GET_LATEST_GLOSSARY_ITEMS } from '@/app/queries/glossary-queries';
import { environment } from '@/environments/environment';
import { GlossaryItem } from '@/models/glossaries/glossary-item';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlossaryService {
  private readonly httpClient = inject(HttpClient);
  private readonly apollo = inject(Apollo);

  get(id: string): Observable<GlossaryItem> {
    return this.httpClient.get<GlossaryItem>(`${environment.apiUrl}/glossary-items/${id}`);
  }

  getLatest(useCache = true): Observable<GlossaryItem[]> {
    return this.apollo
      .query({
        query: GET_LATEST_GLOSSARY_ITEMS,
        fetchPolicy: useCache ? 'cache-first' : 'no-cache',
      })
      .pipe(
        map((result) => {
          return (result.data as { data: GlossaryItem[] }).data;
        })
      );
  }
}
