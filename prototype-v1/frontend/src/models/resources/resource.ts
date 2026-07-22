import { Author } from '@/models/post/blocks/author';
import { MediaFile } from '@/models/post/blocks/media-file';
import { Character } from '@/models/post/character';
import { Source } from './source';

export interface Resource {
  name: string;
  slug: string;
  description: string;
  url: string;
  icon: MediaFile;
  preview: MediaFile;
  characters: Character[];
  source: Source;
  submitter: Author;
}
