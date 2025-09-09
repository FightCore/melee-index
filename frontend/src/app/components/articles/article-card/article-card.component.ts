import { ListedArticle } from '@/app/services/articles/articles.service';
import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-article-card',
  imports: [CardModule, ButtonModule, ChipModule, DatePipe, AvatarModule],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss',
})
export class ArticleCardComponent {
  readonly article = input.required<ListedArticle>();
}
