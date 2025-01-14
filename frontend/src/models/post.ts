import { Author } from './author';

export interface Post {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  summary: string;
  url: string;
  tags: string[];
  author: Author;
}
