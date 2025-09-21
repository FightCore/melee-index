import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private readonly httpClient = inject(HttpClient);

  list(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${environment.apiUrl}/posts`);
  }

  article(id: string): Observable<Article> {
    return this.httpClient.get<Article>(`${environment.apiUrl}/posts/${id}`);
  }
}

export interface PaginatedResult<TResult> {
  data: TResult[];
}

export interface ListedArticle {
  id: number;
  title: string;
  description: string;
  slug: string;
  documentId: string;
  author: Author;
  createdAt: Date;
}

export interface Author {
  id: number;
  name: string;
  avatar: MediaFile;
}

export interface Article {
  id: number;
  title: string;
  description: string;
  slug: string;
  documentId: string;
  blocks: (
    | RichTextBlock
    | CharacterFrameDataBlock
    | MediaBlock
    | SliderBlock
    | QuoteBlock
    | YoutubeVideoEmbedBlock
    | KnowledgeCheckBlock
  )[];
  author: Author;
  createdAt: Date;
  updatedAt: Date;
}

export interface Block {
  __component: string;
  id: number;
}

export interface RichTextBlock extends Block {
  __component: 'shared.rich-text';
  body: string;
}

export interface CharacterFrameDataBlock extends Block {
  __component: 'fightcore.move-embed';
  character: string;
  move: string;
}

export interface MediaBlock extends Block {
  __component: 'shared.media';
  file: MediaFile;
}

export interface SliderBlock extends Block {
  __component: 'shared.slider';
  files: MediaFile[];
}

export interface QuoteBlock extends Block {
  __component: 'shared.quote';
  title: string;
  body: string;
  type: null | 'info' | 'warning' | 'danger' | 'success';
}

export interface MediaFile {
  alternativeText: string | null;
  url: string;
  mime: string;
  size: number;
  width: number | null;
  height: number | null;
}

export interface YoutubeVideoEmbedBlock extends Block {
  __component: 'youtube.video-embed';
  url: string;
}

export interface KnowledgeCheckBlock extends Block {
  __component: 'exercise.knowledge-check';
  question: string;
  answers: string;
  correctAnswer: string;
  body: string;
}
