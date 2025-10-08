import { Character } from '../character';
import { MediaFile } from './media-file';

export interface Author {
    id: number;
    name: string;
    avatar: MediaFile;
    bio: string | null;
    mains: Character[];
}