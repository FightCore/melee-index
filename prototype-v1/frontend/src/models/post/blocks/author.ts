import { Character } from '@/models/post/character';
import { MediaFile } from './media-file';

export interface Author {
  id: number;
  name: string;
  avatar: MediaFile;
  bio: string | null;
  mains: Character[];
  createdAt: Date;
  x: string;
  website: string;
  twitch: string;
  bluesky: string;
  youtube: string;
}
