import { Author } from '../post/blocks/author';
import { MediaFile } from '../post/blocks/media-file';
import { Character } from '../post/character';
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
