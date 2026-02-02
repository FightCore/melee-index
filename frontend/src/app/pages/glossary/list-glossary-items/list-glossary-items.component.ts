import { GlossaryService } from '@/app/services/glossary/glossary.service';
import { GlossaryItem } from '@/models/glossaries/glossary-item';
import { Component, computed, inject, signal } from '@angular/core';
import { GlossaryItemListComponent } from '@/app/components/glossaries/glossary-item-list/glossary-item-list.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';

@Component({
  selector: 'app-list-glossary-items',
  imports: [GlossaryItemListComponent, InputTextModule, FormsModule, IconField, InputIcon],
  templateUrl: './list-glossary-items.component.html',
  styleUrl: './list-glossary-items.component.scss',
})
export class ListGlossaryItemsComponent {
  searchQuery = signal('');

  private readonly allGlossaryItems = signal<GlossaryItem[]>([]);
  private readonly glossaryService = inject(GlossaryService);

  glossaryItems = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const items = this.allGlossaryItems();
    if (!query) {
      return items;
    }

    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.categories?.some((c) => c.name.toLowerCase().includes(query)) ||
        item.characters?.some((c) => c.name.toLowerCase().includes(query))
    );
  });

  constructor() {
    this.glossaryService.getLatest(false).subscribe((glossaryItems) => {
      this.allGlossaryItems.set(glossaryItems);
    });
  }
}
