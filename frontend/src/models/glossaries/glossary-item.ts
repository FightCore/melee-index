import { ComponentType } from '@/models/post/component-type';

export interface GlossaryItem {
  name: string;
  slug: string;
  description: string;
  documentId: string;
  blocks: ComponentType[];
}
