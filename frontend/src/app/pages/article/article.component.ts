import { FightcoreMoveDataComponent } from '@/app/components/content/fightcore-move-data/fightcore-move-data.component';
import { RichTextComponent } from '@/app/components/content/rich-text/rich-text.component';
import { ArticlesService } from '@/app/services/articles/articles.service';
import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MediaComponent } from '@/app/components/content/media/media.component';
import { SliderComponent } from '@/app/components/content/slider/slider.component';
import { QuoteComponent } from '@/app/components/content/quote/quote.component';
import { ChipModule } from 'primeng/chip';
import { YoutubeEmbedComponent } from '@/app/components/content/youtube-embed/youtube-embed.component';
import { KnowledgeCheckComponent } from '@/app/components/content/knowledge-check/knowledge-check.component';
import { AccordionModule } from 'primeng/accordion';
import { ActivatedRoute } from '@angular/router';
import { Article } from '@/models/post/article';
import { CardModule } from "primeng/card";
import { Avatar } from "primeng/avatar";

@Component({
  selector: 'app-article',
  imports: [
    JsonPipe,
    RichTextComponent,
    FightcoreMoveDataComponent,
    MediaComponent,
    SliderComponent,
    QuoteComponent,
    ChipModule,
    YoutubeEmbedComponent,
    KnowledgeCheckComponent,
    AccordionModule,
    CardModule,
    Avatar
],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent {
  private readonly articlesService = inject(ArticlesService);
  private readonly route = inject(ActivatedRoute);
  article: Article | null = null;

  constructor() {
    const articleId = this.route.snapshot.paramMap.get('id');

    if (!articleId) {
      throw new Error('No article ID provided in route');
    }

    this.articlesService.article(articleId).subscribe((article) => {
      this.article = article;
    });
  }
}
