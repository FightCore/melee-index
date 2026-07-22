import { Block } from '@/models/post/block';
import { MediaFile } from './media-file';

export interface SliderBlock extends Block {
  __component: 'shared.slider';
  files: MediaFile[];
}
