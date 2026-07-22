import { GET_CHARACTER_DATA, GET_FRAME_DATA_CHARACTERS } from '@/app/queries/frame-data-queries';
import { FrameDataCharacter } from '@/models/frame-data/frame-data-character';
import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FrameDataService {
  private readonly apollo = inject(Apollo).use('frameData');

  getCharacters(useCache = true): Observable<FrameDataCharacter[]> {
    return this.apollo
      .query({
        query: GET_FRAME_DATA_CHARACTERS,
        fetchPolicy: useCache ? 'cache-first' : 'no-cache',
      })
      .pipe(
        map((result) => {
          return (result.data as { data: FrameDataCharacter[] }).data;
        })
      );
  }

  getFull(fightCoreId: number, useCache = true): Observable<FrameDataCharacter> {
    return this.apollo
      .query({
        query: GET_CHARACTER_DATA,
        variables: {
          fightCoreId: fightCoreId,
        },
        fetchPolicy: useCache ? 'cache-first' : 'no-cache',
      })
      .pipe(
        map((result) => {
          return (result.data as { data: FrameDataCharacter[] }).data[0];
        })
      );
  }
}
