import { CharacterStats } from './character-stats';
import { Move } from './move';

export interface FrameDataCharacter {
  characterStatistics: CharacterStats;
  fightCoreId: number;
  id: number;
  name: string;
  normalizedName: string;
  moves: Move[];
}
