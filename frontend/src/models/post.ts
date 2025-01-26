import { Author } from './author';
import { Source } from './source';

export interface Post {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  summary: string;
  url: string;
  tags: string[];
  author: Author;
  source: Source;
}
