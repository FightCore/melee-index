import { GET_CHARACTERS } from '@/app/queries/character-queries';
import { Character } from '@/models/post/character';
import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private readonly apollo = inject(Apollo);
  getAll(useCache = true): Observable<Character[]> {
    return this.apollo
      .query({
        query: GET_CHARACTERS,
        fetchPolicy: useCache ? 'cache-first' : 'no-cache',
      })
      .pipe(
        map((result) => {
          return (result.data as { data: Character[] }).data;
        })
      );
  }
}
