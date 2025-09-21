import { Block } from '@/models/post/block';

export interface YoutubeVideoEmbedBlock extends Block {
  __component: 'youtube.video-embed';
  url: string;
}
