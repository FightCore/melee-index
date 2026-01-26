import { GlossaryService } from '@/app/services/glossary/glossary.service';
import { GlossaryItem } from '@/models/glossaries/glossary-item';
import { Component, inject, signal } from '@angular/core';
import { GlossaryItemListComponent } from '@/app/components/glossaries/glossary-item-list/glossary-item-list.component';

@Component({
  selector: 'app-list-glossary-items',
  imports: [GlossaryItemListComponent],
  templateUrl: './list-glossary-items.component.html',
  styleUrl: './list-glossary-items.component.scss',
})
export class ListGlossaryItemsComponent {
  public glossaryItems = signal<GlossaryItem[]>([]);

  private readonly glossaryService = inject(GlossaryService);

  constructor() {
    this.glossaryService.getLatest().subscribe((glossaryItems) => {
      this.glossaryItems.set(glossaryItems);
    });
  }
}
