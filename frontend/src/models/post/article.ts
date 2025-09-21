import { Author } from './blocks/author';
import { MediaFile } from './blocks/media-file';
import { ComponentType } from './component-type';

export interface Article {
  id: number;
  title: string;
  description: string;
  slug: string;
  documentId: string;
  blocks: ComponentType[];
  author: Author;
  cover: MediaFile | null;
  createdAt: Date;
  updatedAt: Date;
}
