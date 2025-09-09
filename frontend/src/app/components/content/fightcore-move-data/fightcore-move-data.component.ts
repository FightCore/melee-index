import { CharacterFrameDataBlock } from '@/app/services/articles/articles.service';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-fightcore-move-data',
  imports: [],
  templateUrl: './fightcore-move-data.component.html',
  styleUrl: './fightcore-move-data.component.scss',
})
export class FightcoreMoveDataComponent {
  readonly block = input.required<CharacterFrameDataBlock>();
}
