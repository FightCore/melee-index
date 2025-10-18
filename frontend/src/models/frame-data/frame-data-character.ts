import { CharacterStats } from './character-stats';

export interface FrameDataCharacter {
  characterStatistics: CharacterStats;
  fightCoreId: number;
  id: number;
  name: string;
  normalizedName: string;
}
