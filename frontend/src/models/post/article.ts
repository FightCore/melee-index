import { Author } from './blocks/author';
import { ComponentType } from './component-type';

export interface Article {
  id: number;
  title: string;
  description: string;
  slug: string;
  documentId: string;
  blocks: ComponentType[];
  author: Author;
  createdAt: Date;
  updatedAt: Date;
}
