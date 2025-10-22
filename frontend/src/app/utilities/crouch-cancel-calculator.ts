import { FrameDataCharacter } from '@/models/frame-data/frame-data-character';
import { Hitbox } from '@/models/frame-data/hitbox';
import { Move } from '@/models/frame-data/move';
import { MoveType } from '@/models/frame-data/move-type';

export function canBeCrouchCanceled(move: Move): boolean {
  const allowedTypes = [
    MoveType.Air,
    MoveType.Grounded,
    MoveType.Special,
    MoveType.Tilt,
    MoveType.KirbySpecial,
    MoveType.EdgeAttack,
    MoveType.Tech,
    MoveType.Unknown,
  ];
  return allowedTypes.includes(move.type) && !!move.hits && move.hits.length > 0;
}

export function isCrouchCancelPossible(hitbox: Hitbox): boolean {
  if ((hitbox.angle > 179 && hitbox.angle != 361) || hitbox.angle === 0) {
    return false;
  }
  return true;
}

export function getCrouchCancelImpossibleReason(hitbox: Hitbox): string {
  if (hitbox.angle > 179 && hitbox.angle != 361) {
    return `Can not be crouch canceled or ASDI downed-ed due to angle being higher than 179 (${hitbox.angle})`;
  }
  return `Can not be crouch canceled or ASDI down-ed due to angle being 0`;
}

export function calculateCrouchCancelPercentage(
  hitbox: Hitbox,
  target: FrameDataCharacter,
  knockbackTarget: KnockbackTarget,
  floor: boolean,
  display99PercentForNeverBreaks: boolean,
  staleness: number
): string {
  if (hitbox.setKnockback) {
    return setKnockbackCalculation(hitbox, target, knockbackTarget, display99PercentForNeverBreaks);
  }

  if (hitbox.knockbackGrowth === 0) {
    return display99PercentForNeverBreaks ? '99%' : 'Never breaks';
  }

  const staleDamageReduction = staleness * hitbox.damage;
  const staleDamage = hitbox.damage - staleDamageReduction;

  const percentage =
    ((100 + target.characterStatistics.weight) / 14) *
      (((100 / hitbox.knockbackGrowth) * (knockbackTarget - hitbox.baseKnockback) - 18) / (hitbox.damage + 2)) -
    staleDamage;

  if (Infinity === percentage) {
    // Sentry.captureMessage(
    //   `Crouch cancel calculation resulted in Infinity for ${hitbox.id} for target ${target.fightCoreId}`
    // );

    return display99PercentForNeverBreaks ? '99%' : 'Never breaks';
  }

  if (percentage > 0) {
    if (floor) {
      // Melee uses floored percentages within its calculation for the knockback.
      // Because of that, we need to do the reverse and grab the ceiling of the percentage.
      // In Fox's Jab 1 vs Falcon the percentage is 243.71%.
      // This means that 243 is not enough to break crouch cancel but 244% is.
      return Math.ceil(percentage) + '%';
    }

    return percentage.toFixed(2) + '%';
  }

  return '0%';
}

export function meetsKnockbackTarget(
  hitbox: Hitbox,
  character: FrameDataCharacter,
  knockbackTarget: KnockbackTarget
): boolean {
  // Weight dependant set knockback formula as found on the following sources:
  // eslint-disable-next-line max-len
  // - IKneeData: https://github.com/schmooblidon/schmooblidon.github.io/blob/09c8d4303ce6d98d62918073b474099b5ed9a026/calculatormaths.js#L101
  // - standardtoaster/magus on Smashboards: https://smashboards.com/threads/melee-knockback-values.334245/post-15368915
  const knockback =
    (((hitbox.setKnockback * 10) / 20 + 1) * 1.4 * (200 / (character.characterStatistics.weight + 100)) + 18) *
      (hitbox.knockbackGrowth / 100) +
    hitbox.baseKnockback;

  // The move can be CCed/ASDIed by the given character if the knockback target is NOT met.
  return knockback >= knockbackTarget;
}

function setKnockbackCalculation(
  hitbox: Hitbox,
  target: FrameDataCharacter,
  knockbackTarget: KnockbackTarget,
  display99PercentForNeverBreaks: boolean
): string {
  if (meetsKnockbackTarget(hitbox, target, knockbackTarget)) {
    return '0%';
  } else {
    return display99PercentForNeverBreaks ? '99%' : 'Never breaks';
  }
}

export type KnockbackTarget = 80 | 120;
