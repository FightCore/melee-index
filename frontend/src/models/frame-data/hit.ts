import { Hitbox } from './hitbox';

export interface Hit {
  id: number;
  name: string;
  end: number;
  start: number;
  hitboxes: Hitbox[];
}
