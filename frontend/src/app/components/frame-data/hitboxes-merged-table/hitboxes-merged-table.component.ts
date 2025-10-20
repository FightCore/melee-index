import {
  processDuplicateHitboxes,
  processDuplicateHits,
  flattenData,
  cloneObject,
  generateColors,
} from '@/app/utilities/hitbox-utils';
import { Hit } from '@/models/frame-data/hit';
import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hitboxes-merged-table',
  imports: [],
  templateUrl: './hitboxes-merged-table.component.html',
  styleUrl: './hitboxes-merged-table.component.scss',
  standalone: true,
})
export class HitboxesMergedTableComponent implements OnInit {
  readonly hits = input.required<Hit[]>();

  ngOnInit(): void {
    const processedHits = processDuplicateHitboxes(this.hits());
    const data = processDuplicateHits(flattenData(processedHits));
    const colors = generateColors(data);
  }
}
