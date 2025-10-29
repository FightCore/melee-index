import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-website-section-card',
  imports: [CardModule, RouterModule],
  templateUrl: './website-section-card.component.html',
  styleUrl: './website-section-card.component.scss',
})
export class WebsiteSectionCardComponent {
  title = input.required<string>();
  description = input.required<string>();
  link = input.required<string>();
}
