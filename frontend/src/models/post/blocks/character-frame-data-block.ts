import { Block } from '@/models/post/block';

export interface CharacterFrameDataBlock extends Block {
  __component: 'fightcore.move-embed';
  character: string;
  move: string;
}
