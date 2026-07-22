import { GlossaryService } from '@/app/services/glossary/glossary.service';
import { GlossaryItem } from '@/models/glossaries/glossary-item';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RichTextComponent } from '@/app/components/content/rich-text/rich-text.component';
import { FightcoreMoveDataComponent } from '@/app/components/content/fightcore-move-data/fightcore-move-data.component';
import { MediaComponent } from '@/app/components/content/media/media.component';
import { SliderComponent } from '@/app/components/content/slider/slider.component';
import { QuoteComponent } from '@/app/components/content/quote/quote.component';
import { YoutubeEmbedComponent } from '@/app/components/content/youtube-embed/youtube-embed.component';
import { KnowledgeCheckComponent } from '@/app/components/content/knowledge-check/knowledge-check.component';
import { JsonPipe } from '@angular/common';
import { Accordion, AccordionPanel, AccordionHeader, AccordionContent } from 'primeng/accordion';
import { AuthorCardComponent } from '@/app/components/authors/author-card/author-card.component';

@Component({
  selector: 'app-glossary-item',
  imports: [
    RichTextComponent,
    FightcoreMoveDataComponent,
    MediaComponent,
    SliderComponent,
    QuoteComponent,
    YoutubeEmbedComponent,
    KnowledgeCheckComponent,
    JsonPipe,
    Accordion,
    AccordionPanel,
    AccordionHeader,
    AccordionContent,
    AuthorCardComponent,
  ],
  templateUrl: './glossary-item.component.html',
  styleUrl: './glossary-item.component.scss',
})
export class GlossaryItemComponent {
  public glossaryItem = signal<GlossaryItem | null>(null);

  private readonly route = inject(ActivatedRoute);
  private readonly glossaryService = inject(GlossaryService);

  constructor() {
    const glossaryItemId = this.route.snapshot.paramMap.get('id');
    if (!glossaryItemId) {
      throw new Error();
    }

    this.glossaryService
      .get(glossaryItemId)
      .subscribe((glossaryItem) => this.glossaryItem.set(glossaryItem));
  }
}
