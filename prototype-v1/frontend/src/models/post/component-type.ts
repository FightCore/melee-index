import { CharacterFrameDataBlock } from './blocks/character-frame-data-block';
import { KnowledgeCheckBlock } from './blocks/knowledge-check-block';
import { MediaBlock } from './blocks/media-block';
import { QuoteBlock } from './blocks/quote-block';
import { RichTextBlock } from './blocks/rich-text-block';
import { SliderBlock } from './blocks/slider-block';
import { YoutubeVideoEmbedBlock } from './blocks/youtube-video-embed-block';

export type ComponentTypeName =
  | 'shared.rich-text'
  | 'fightcore.move-embed'
  | 'shared.media'
  | 'shared.slider'
  | 'shared.quote'
  | 'youtube.video-embed'
  | 'exercise.knowledge-check';

export type ComponentType =
  | RichTextBlock
  | CharacterFrameDataBlock
  | MediaBlock
  | SliderBlock
  | QuoteBlock
  | YoutubeVideoEmbedBlock
  | KnowledgeCheckBlock;
