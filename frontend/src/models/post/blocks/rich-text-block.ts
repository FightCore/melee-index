import { Block } from '@/models/post/block';

export interface RichTextBlock extends Block {
  __component: 'shared.rich-text';
  body: string;
}
