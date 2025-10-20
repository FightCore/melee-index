import { MoveAttributesTableComponent } from '@/app/components/frame-data/move-attributes-table/move-attributes-table.component';
import { FrameDataService } from '@/app/services/frame-data/frame-data.service';
import { FrameDataCharacter } from '@/models/frame-data/frame-data-character';
import { Move } from '@/models/frame-data/move';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HitboxesMergedTableComponent } from '@/app/components/frame-data/hitboxes-merged-table/hitboxes-merged-table.component';

@Component({
  selector: 'app-frame-data-move-page',
  imports: [MoveAttributesTableComponent, HitboxesMergedTableComponent],
  templateUrl: './frame-data-move-page.component.html',
  styleUrl: './frame-data-move-page.component.scss',
  standalone: true,
})
export class FrameDataMovePageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly frameDataService = inject(FrameDataService);
  character: FrameDataCharacter | null = null;
  move: Move | null = null;

  constructor() {
    const characterId = this.route.snapshot.paramMap.get('characterId');
    this.frameDataService.getFull(Number.parseInt(characterId as string)).subscribe((character) => {
      this.character = character;
      this.move =
        character.moves.find(
          (move) => move.id === Number.parseInt(this.route.snapshot.paramMap.get('moveId') as string)
        ) ?? null;
    });
  }
}
