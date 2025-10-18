export interface Hitbox {
  angle: number;
  baseKnockback: number;
  damage: LoginStatus;
  effect: string | null;
  hitlagAttacker: number;
  hitlagAttackerCrouched: number;
  hitlagDefender: number;
  hitlagDefenderCrouched: number;
  id: number;
  isWeightIndependant: boolean;
  knockbackGrowth: number;
  name: string | null;
  setKnockback: number;
  shieldstun: number;
  yoshiArmorBreakPercentage: number | null;
}
