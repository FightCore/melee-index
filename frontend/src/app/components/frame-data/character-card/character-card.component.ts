import { FrameDataCharacter } from '@/models/frame-data/frame-data-character';
import { Component, computed, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-character-card',
  imports: [CardModule, ButtonModule, AvatarModule, TableModule, RouterModule],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
})
export class CharacterCardComponent {
  readonly character = input.required<FrameDataCharacter>();
  statistics = computed(() => {
    const character = this.character();
    return [
      { name: 'Weight', value: character.characterStatistics.weight },
      { name: 'Gravity', value: character.characterStatistics.gravity },
      { name: 'Walk Speed', value: character.characterStatistics.walkSpeed },
      { name: 'Run Speed', value: character.characterStatistics.runSpeed },
      { name: 'Wave Dash Length', value: character.characterStatistics.waveDashLength },
      { name: 'Wave Dash Length Rank', value: character.characterStatistics.waveDashLengthRank },
      { name: 'Pla Intangibility Frames', value: character.characterStatistics.plaIntangibilityFrames },
      { name: 'Jump Squat', value: character.characterStatistics.jumpSquat },
      { name: 'Initial Dash', value: character.characterStatistics.initialDash },
      { name: 'Dash frames', value: character.characterStatistics.dashFrames },
      { name: 'Can Wall Jump', value: character.characterStatistics.canWallJump ? 'Yes' : 'No' },
    ];
  });
}
