import { FrameDataCharacter } from '@/models/frame-data/frame-data-character';
import { Move } from '@/models/frame-data/move';
import { Component, input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-move-card',
  imports: [CardModule, ButtonModule, RouterModule, DividerModule],
  templateUrl: './move-card.component.html',
  styleUrl: './move-card.component.scss',
  standalone: true,
})
export class MoveCardComponent implements OnInit {
  readonly move = input.required<Move>();
  readonly character = input.required<FrameDataCharacter>();

  statistics: { name: string; value: string }[] = [];

  ngOnInit(): void {
    const newStatistics = [];
    const move = this.move();

    if (move.autoCancelBefore) {
      newStatistics.push({ name: 'Auto Cancel Before', value: move.autoCancelBefore.toString() });
    }
    if (move.autoCancelAfter) {
      newStatistics.push({ name: 'Auto Cancel After', value: move.autoCancelAfter.toString() });
    }
    if (move.iasa) {
      newStatistics.push({ name: 'IASA', value: move.iasa.toString() });
    }
    if (move.lCanceledLandLag) {
      newStatistics.push({ name: 'L-Canceled Land Lag', value: move.lCanceledLandLag.toString() });
    }
    if (move.landingFallSpecialLag) {
      newStatistics.push({ name: 'Landing Fall Special Lag', value: move.landingFallSpecialLag.toString() });
    }
    if (move.landLag) {
      newStatistics.push({ name: 'Land Lag', value: move.landLag.toString() });
    }

    this.statistics = newStatistics;
  }
}
