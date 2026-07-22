import { ComponentType } from '@/models/post/component-type';
import { Author } from '@/models/post/blocks/author';
import { MediaFile } from '@/models/post/blocks/media-file';
import { Category } from '@/models/post/category';
import { Character } from '@/models/post/character';

export interface GlossaryItem {
  name: string;
  slug: string;
  description: string;
  documentId: string;
  blocks: ComponentType[];
  author?: Author;
  cover?: MediaFile;
  categories: Category[] | null;
  characters: Character[] | null;
}
