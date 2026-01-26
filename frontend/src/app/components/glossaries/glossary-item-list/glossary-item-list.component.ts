import { GlossaryItem } from '@/models/glossaries/glossary-item';
import { Component, input } from '@angular/core';
import { Card } from 'primeng/card';
import { ButtonDirective } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-glossary-item-list',
  imports: [Card, ButtonDirective, RouterModule],
  templateUrl: './glossary-item-list.component.html',
  styleUrl: './glossary-item-list.component.scss',
})
export class GlossaryItemListComponent {
  glossaryItems = input.required<GlossaryItem[]>();
}
