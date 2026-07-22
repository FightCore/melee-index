import { FrameDataService } from '@/app/services/frame-data/frame-data.service';
import { FrameDataCharacter } from '@/models/frame-data/frame-data-character';
import { Move } from '@/models/frame-data/move';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MOVE_SORTING } from './move-sorting';
import { MoveCardComponent } from '@/app/components/frame-data/move-card/move-card.component';

@Component({
  selector: 'app-frame-data-character-page',
  imports: [MoveCardComponent],
  templateUrl: './frame-data-character-page.component.html',
  styleUrl: './frame-data-character-page.component.scss',
  standalone: true,
})
export class FrameDataCharacterPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly frameDataService = inject(FrameDataService);
  character: FrameDataCharacter | null = null;
  moves: MovesDisplay[] = [];

  constructor() {
    const characterId = this.route.snapshot.paramMap.get('id');
    this.frameDataService.getFull(Number.parseInt(characterId as string)).subscribe((character) => {
      this.character = character;
      this.moves = this.createMovesMap(character.moves ?? [], '');
    });
  }

  private createMovesMap(moves: Move[], searchQuery: string): MovesDisplay[] {
    const moveMap: MovesDisplay[] = [];

    for (const moveType of MOVE_SORTING) {
      let filteredMoves = moves.filter((move) => move.type === moveType.type);

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filteredMoves = filteredMoves.filter(
          (move) => move.name?.toLowerCase().includes(query) || move.normalizedName?.toLowerCase().includes(query)
        );
      }

      if (filteredMoves.length > 0) {
        if (moveType.sorting) {
          filteredMoves.sort(
            (a, b) => moveType.sorting.indexOf(a.normalizedName!) - moveType.sorting.indexOf(b.normalizedName!)
          );
        }

        moveMap.push({ name: moveType.name, moves: filteredMoves });
      }
    }

    return moveMap;
  }
}

interface MovesDisplay {
  name: string;
  moves: Move[];
}
