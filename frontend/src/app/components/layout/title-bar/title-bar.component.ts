import { Component, input } from '@angular/core';

@Component({
  selector: 'app-title-bar',
  imports: [],
  templateUrl: './title-bar.component.html',
  styleUrl: './title-bar.component.scss',
})
export class TitleBarComponent {
  title = input.required<string>();
  subtitle = input<string | null>(null);
  icon = input.required<string>();
}
