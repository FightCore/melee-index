import { Block } from '@/models/post/block';
import { MediaFile } from './media-file';

export interface MediaBlock extends Block {
  __component: 'shared.media';
  file: MediaFile;
}
