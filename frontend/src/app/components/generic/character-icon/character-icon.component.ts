import { Component, input } from '@angular/core';

@Component({
  selector: 'app-character-icon',
  imports: [],
  templateUrl: './character-icon.component.html',
  styleUrl: './character-icon.component.scss',
  host: {
    '[class]': 'class()',
  },
})
export class CharacterIconComponent {
  readonly characterName = input.required<string>();
  // Signal input
  class = input<string>('');
}
