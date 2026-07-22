import { Move } from '@/models/frame-data/move';
import { Component, input, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-move-attributes-table',
  imports: [TableModule, CardModule],
  templateUrl: './move-attributes-table.component.html',
  styleUrl: './move-attributes-table.component.scss',
})
export class MoveAttributesTableComponent implements OnInit {
  readonly move = input.required<Move>();
  cols: { header: string; field: keyof Move }[] | null = null;

  ngOnInit(): void {
    this.cols = [
      { header: 'Start', field: 'start' },
      { header: 'End', field: 'end' },
      { header: 'Total Frames', field: 'totalFrames' },
      { header: 'IASA', field: 'iasa' },
      { header: 'Percent', field: 'percent' },
      { header: 'Land Lag', field: 'landLag' },
      { header: 'L-Canceled Land Lag', field: 'lCanceledLandLag' },
      { header: 'Landing Fall Special Lag', field: 'landingFallSpecialLag' },
      { header: 'Auto Cancel Before', field: 'autoCancelBefore' },
      { header: 'Auto Cancel After', field: 'autoCancelAfter' },
    ];
  }
}
