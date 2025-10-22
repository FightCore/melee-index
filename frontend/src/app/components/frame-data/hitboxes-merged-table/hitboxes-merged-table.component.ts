import {
  processDuplicateHitboxes,
  processDuplicateHits,
  flattenData,
  generateColors,
  FlattenedHitbox,
  HitboxColor,
} from '@/app/utilities/hitbox-utils';
import { Hit } from '@/models/frame-data/hit';
import { Component, input, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-hitboxes-merged-table',
  imports: [TableModule],
  templateUrl: './hitboxes-merged-table.component.html',
  styleUrl: './hitboxes-merged-table.component.scss',
  standalone: true,
})
export class HitboxesMergedTableComponent implements OnInit {
  readonly hits = input.required<Hit[]>();
  flattenedHitboxes: FlattenedHitbox[] | null = null;
  colors: HitboxColor[] | null = null;

  ngOnInit(): void {
    const processedHits = processDuplicateHitboxes(this.hits());
    const flattenedHitboxes = processDuplicateHits(flattenData(processedHits));
    this.colors = generateColors(flattenedHitboxes);
    this.flattenedHitboxes = flattenedHitboxes.map((hit) => ({
      ...hit,
      color:
        this.colors?.find((color) => color.start === hit.earliestStart && color.end === hit.latestEnd)?.color ?? null,
    }));
    console.log(this.flattenedHitboxes);
  }
}
