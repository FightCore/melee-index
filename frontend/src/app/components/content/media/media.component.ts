import { MediaBlock } from '@/app/services/articles/articles.service';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-media',
  imports: [],
  templateUrl: './media.component.html',
  styleUrl: './media.component.scss',
})
export class MediaComponent {
  readonly block = input.required<MediaBlock>();
}
