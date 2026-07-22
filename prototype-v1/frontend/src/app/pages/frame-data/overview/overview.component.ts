import { FrameDataService } from '@/app/services/frame-data/frame-data.service';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { CharacterCardComponent } from '@/app/components/frame-data/character-card/character-card.component';

@Component({
  selector: 'app-overview',
  imports: [AsyncPipe, SkeletonModule, CharacterCardComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  standalone: true,
})
export class FrameDataOverviewComponent {
  private readonly frameDataService = inject(FrameDataService);
  characters$ = this.frameDataService.getCharacters();
}
