import { Block } from '@/models/post/block';

export interface KnowledgeCheckBlock extends Block {
  __component: 'exercise.knowledge-check';
  question: string;
  answers: string;
  correctAnswer: string;
  body: string;
}
