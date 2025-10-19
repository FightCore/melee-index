import { FrameDataService } from '@/app/services/frame-data/frame-data.service';
import { FrameDataCharacter } from '@/models/frame-data/frame-data-character';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-frame-data-character-page',
  imports: [AsyncPipe],
  templateUrl: './frame-data-character-page.component.html',
  styleUrl: './frame-data-character-page.component.scss',
  standalone: true,
})
export class FrameDataCharacterPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly frameDataService = inject(FrameDataService);
  readonly character$: Observable<FrameDataCharacter>;

  constructor() {
    const characterId = this.route.snapshot.paramMap.get('id');
    this.character$ = this.frameDataService.getFull(Number.parseInt(characterId as string));
  }
}
