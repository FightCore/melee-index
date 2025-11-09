import {
  FlattenedHitbox,
  HitboxColor,
  processDuplicateHitboxes,
  processDuplicateHits,
  flattenData,
  generateColors,
  getUnique,
} from '@/app/utilities/hitbox-utils';
import { Hit } from '@/models/frame-data/hit';
import { Component, inject, input, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { FrameDataCharacter } from '@/models/frame-data/frame-data-character';
import { FrameDataService } from '@/app/services/frame-data/frame-data.service';
import { calculateCrouchCancelPercentage } from '@/app/utilities/crouch-cancel-calculator';
import { Hitbox } from '@/models/frame-data/hitbox';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { StalenessSelectorComponent } from '../staleness-selector/staleness-selector.component';
import { CharacterIconComponent } from '../../generic/character-icon/character-icon.component';

@Component({
  selector: 'app-crouch-cancel-percentages-table',
  imports: [
    TableModule,
    CardModule,
    SelectButtonModule,
    FormsModule,
    AvatarModule,
    DividerModule,
    FloatLabelModule,
    RadioButtonModule,
    CheckboxModule,
    StalenessSelectorComponent,
    CharacterIconComponent,
  ],
  templateUrl: './crouch-cancel-percentages-table.component.html',
  styleUrl: './crouch-cancel-percentages-table.component.scss',
  standalone: true,
})
export class CrouchCancelPercentagesTableComponent implements OnInit {
  readonly hits = input.required<Hit[]>();
  private flattenedHitboxes: FlattenedHitbox[] | null = null;
  private colors: HitboxColor[] | null = null;
  private characters?: FrameDataCharacter[];

  private readonly frameDataService = inject(FrameDataService);

  selectableHits?: { label: string; value: string }[];
  selectedHit?: string;
  selectableHitboxes?: { label: string; value: string }[];
  selectedHitbox?: string;

  sorting: 'alphabetical' | 'weight' = 'alphabetical';
  ceiling = true;
  percentageToggle = true;
  staleness = 0;

  asdiDown?: { character: string; percentage: string }[];
  crouchCancel?: { character: string; percentage: string }[];

  constructor() {
    this.frameDataService.getCharacters().subscribe((characters) => {
      this.characters = characters.filter((character) => character.characterStatistics.weight > 0);
      this.calculate();
    });
  }

  ngOnInit(): void {
    const processedHits = processDuplicateHitboxes(this.hits());
    const flattenedHitboxes = processDuplicateHits(flattenData(processedHits));
    this.colors = generateColors(flattenedHitboxes);
    this.flattenedHitboxes = flattenedHitboxes.map((hit) => ({
      ...hit,
      color:
        this.colors?.find((color) => color.start === hit.earliestStart && color.end === hit.latestEnd)?.color ?? null,
    }));

    this.selectableHits = getUnique(
      this.flattenedHitboxes.map((hit) => {
        return hit.earliestStart + ' - ' + hit.latestEnd;
      })
    ).map((hit) => ({
      label: hit,
      value: hit,
    }));
    this.selectedHit = this.selectableHits[0].value;
    this.onHitSelection();
  }

  onHitSelection(): void {
    if (!this.selectedHit) {
      this.selectableHitboxes = undefined;
      this.selectedHitbox = undefined;
      this.asdiDown = undefined;
      this.crouchCancel = undefined;
      return;
    }

    this.selectableHitboxes = getUnique(
      this.flattenedHitboxes!.filter((hit) => hit.earliestStart + ' - ' + hit.latestEnd === this.selectedHit).map(
        (hit) => hit.name!
      )
    )
      .map((hit) => ({
        label: hit,
        value: hit,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
    this.selectedHitbox = this.selectableHitboxes[0].value;
    this.calculate();
  }

  updateStaleness(staleness: number): void {
    this.staleness = staleness;
    this.calculate();
  }

  calculate(): void {
    if (!this.selectedHit || !this.selectedHitbox || !this.characters) {
      console.log('Calculation failed due to missing data');
      return;
    }
    const hitbox = this.flattenedHitboxes!.find(
      (hitbox) =>
        hitbox.earliestStart + ' - ' + hitbox.latestEnd === this.selectedHit && hitbox.name === this.selectedHitbox
    );

    if (hitbox === null) {
      console.log("Calculation failed as couldn't find hitbox");
      return;
    }

    this.calculateAsdiDown(hitbox!);
    this.calculateCrouchCancel(hitbox!);
  }

  calculateAsdiDown(hitbox: Hitbox): void {
    let asdiDown = this.characters!.map((character) => {
      const percentage = calculateCrouchCancelPercentage(
        hitbox,
        character,
        80,
        this.ceiling,
        this.percentageToggle,
        this.staleness
      );
      return {
        character: character,
        percentage,
      };
    });

    asdiDown = asdiDown.sort(this.sortStats.bind(this));

    this.asdiDown = asdiDown.map((character) => {
      return {
        character: character.character.name,
        percentage: character.percentage,
      };
    });
  }

  calculateCrouchCancel(hitbox: Hitbox): void {
    let crouchCancel = this.characters!.map((character) => {
      const percentage = calculateCrouchCancelPercentage(
        hitbox,
        character,
        120,
        this.ceiling,
        this.percentageToggle,
        this.staleness
      );
      return {
        character: character,
        percentage,
      };
    });

    crouchCancel = crouchCancel.sort(this.sortStats.bind(this));

    this.crouchCancel = crouchCancel.map((character) => {
      return {
        character: character.character.name,
        percentage: character.percentage,
      };
    });
  }

  private sortStats(
    a: { character: FrameDataCharacter; percentage: string },
    b: { character: FrameDataCharacter; percentage: string }
  ) {
    if (this.sorting === 'alphabetical') {
      return a.character.name.localeCompare(b.character.name);
    } else {
      return b.character.characterStatistics.weight - a.character.characterStatistics.weight;
    }
  }
}
