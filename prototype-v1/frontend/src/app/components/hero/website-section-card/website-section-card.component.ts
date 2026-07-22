import { ALIGN_FOOTER_CARD_PT } from '@/app/utilities/passthroughs/card-passthroughs';
import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-website-section-card',
  imports: [CardModule, RouterModule, ButtonModule],
  templateUrl: './website-section-card.component.html',
  styleUrl: './website-section-card.component.scss',
})
export class WebsiteSectionCardComponent {
  sectionTitle = input.required<string>();
  description = input.required<string>();
  link = input.required<string>();
  author = input.required<string>();
  cardPtOptions = ALIGN_FOOTER_CARD_PT;
}
