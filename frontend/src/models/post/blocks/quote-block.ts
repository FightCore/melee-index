import { Block } from '@/models/post/block';

export interface QuoteBlock extends Block {
  __component: 'shared.quote';
  title: string;
  body: string;
  type: 'success' | 'info' | 'warn' | 'secondary' | 'contrast' | 'error' | null | undefined;
}
