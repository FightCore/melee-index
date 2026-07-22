import { GlossaryItem } from '@/models/glossaries/glossary-item';
import { Component, computed, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ALIGN_FOOTER_CARD_WITH_HEADER_PT } from '@/app/utilities/passthroughs/card-passthroughs';
import { Chip } from 'primeng/chip';
import { CharacterIconComponent } from '@/app/components/generic/character-icon/character-icon.component';

@Component({
  selector: 'app-glossary-item-list',
  imports: [RouterModule, Chip, CharacterIconComponent],
  templateUrl: './glossary-item-list.component.html',
  styleUrl: './glossary-item-list.component.scss',
})
export class GlossaryItemListComponent {
  displayItems = computed(() => {
    const items = this.glossaryItems();
    return items.sort((a, b) => a.name.localeCompare(b.name));
  });
  glossaryItems = input.required<GlossaryItem[]>();
  cardPtOptions = ALIGN_FOOTER_CARD_WITH_HEADER_PT;
}
