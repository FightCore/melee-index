import { Hit } from '@/models/frame-data/hit';
import { Hitbox } from '@/models/frame-data/hitbox';

export function areHitboxesOfHitEqual(hit: Hit): boolean {
  return areAllHitboxesEqual(hit.hitboxes);
}

export function areAllHitboxesEqual(hitboxes: Hitbox[]): boolean {
  if (hitboxes.length == 1) {
    return true;
  }

  const firstHitbox = hitboxes[0];

  return hitboxes.slice(1).every((hitbox) => areHitboxesEqual(hitbox, firstHitbox));
}

export function areHitboxesEqual(hitboxOne: Hitbox, hitboxTwo: Hitbox): boolean {
  const attributes: (keyof Hitbox)[] = [
    'angle',
    'damage',
    'baseKnockback',
    'knockbackGrowth',
    'setKnockback',
    'effect',
  ];

  for (const attribute of attributes) {
    if (hitboxOne[attribute] != hitboxTwo[attribute]) {
      return false;
    }
  }

  return true;
}

export function getHitboxColor(hits: HitboxColor[], frame: number): string | null {
  if (hits.every((hit) => hit.start === 0 && hit.end === 0)) {
    return null;
  }

  const index = hits.findIndex((hit) => frame >= hit.start && frame <= hit.end);

  if (index == -1) {
    return null;
  }

  return hits[index].color;
}

export function processDuplicateHitboxes(hits: Hit[]): Hit[] {
  const newData = [];
  for (const hit of hits) {
    if (areAllHitboxesEqual(hit.hitboxes)) {
      const newHitbox = cloneObject(hit.hitboxes[0]);
      newHitbox.name = 'All Hitboxes';
      const newHit = cloneObject(hit);
      newHit.hitboxes = [newHitbox];
      newData.push(newHit);
    } else {
      newData.push(hit);
    }
  }
  return newData;
}

export function processDuplicateHits(hits: FlattenedHitbox[]): FlattenedHitbox[] {
  const newHits = cloneObject(hits);

  let uniqueHitTexts = getMappedUnique(newHits, (hit) => hit.hit);
  for (let i = uniqueHitTexts.length - 1; i > 0; i--) {
    const firstHits = newHits.filter((hit) => hit.hit === uniqueHitTexts[i]);
    const secondHits = newHits.filter((hit) => hit.hit === uniqueHitTexts[i - 1]);
    if (!firstHits || !secondHits) {
      return newHits;
    }

    if (areHitsEqual(firstHits, secondHits)) {
      const newText = secondHits[0].hit + ', ' + firstHits[0].hit;
      for (const hit of [...secondHits]) {
        hit.hit = newText;
        hit.hitObjects.push(...firstHits[0].hitObjects);
        hit.earliestStart = Math.min(hit.earliestStart, firstHits[0].earliestStart);
        hit.latestEnd = Math.max(hit.latestEnd, firstHits[0].latestEnd);
      }

      const leadingIndex = newHits.indexOf(firstHits[0]);
      newHits.splice(leadingIndex, firstHits.length);
      uniqueHitTexts = getMappedUnique(newHits, (hit) => hit.hit);
    }
  }

  return newHits;
}

export function areHitsEqual(hitboxesOne: Hitbox[], hitboxesTwo: Hitbox[]): boolean {
  if (hitboxesOne.length !== hitboxesTwo.length) {
    return false;
  }

  for (const hitboxOne of hitboxesOne) {
    const hitboxTwo = hitboxesTwo.find((hitboxTwo) => hitboxTwo.name === hitboxOne.name);
    if (!hitboxTwo) {
      return false;
    }

    if (!areHitboxesEqual(hitboxOne, hitboxTwo)) {
      return false;
    }
  }

  return true;
}

export interface HitboxColor {
  start: number;
  end: number;
  color: string;
}

const colors = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-black dark:bg-white',
  'bg-pink-500',
  'bg-green-700',
  'bg-blue-300',
  'bg-blue-700',
  'bg-amber-500',
  'bg-lime-500',
];

export function generateColors(data: FlattenedHitbox[]): HitboxColor[] {
  const result: HitboxColor[] = [];
  const uniqueTexts = getMappedUnique(data, (hitbox) => hitbox.hit);
  let iterator = 0;
  for (const text of uniqueTexts) {
    const firstHitbox = data.find((hitbox) => hitbox.hit === text);
    if (!firstHitbox) {
      continue;
    }
    for (const hit of firstHitbox.hitObjects) {
      result.push({
        start: hit.start,
        end: hit.end,
        color: colors[iterator],
      });
    }
    iterator++;
  }

  return result;
}

export interface FlattenedHitbox extends Hitbox {
  hit: string;
  hitObjects: Hit[];
  earliestStart: number;
  latestEnd: number;
  color?: string | null;
}

export function flattenData(hits: Hit[]): FlattenedHitbox[] {
  const flattenedHits = hits.flatMap((hit) =>
    hit.hitboxes.flatMap((hitbox) => ({
      hit: hit.name ? hit.name : hit.start + ' - ' + hit.end,
      hitObjects: [hit],
      earliestStart: hit.start,
      latestEnd: hit.end,
      ...hitbox,
    }))
  );

  return flattenedHits;
}

export function getUnique<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

export function getMappedUnique<T, Y>(values: T[], predicate: (value: T) => Y): Y[] {
  return getUnique(values.map(predicate));
}

export function cloneObject<T>(obj: T): T {
  if (typeof window !== 'undefined' && typeof window.structuredClone === 'function') {
    return window.structuredClone(obj);
  }

  return JSON.parse(JSON.stringify(obj)) as T;
}
