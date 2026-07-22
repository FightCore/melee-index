import { AlternativeAnimation } from './alternative-animation';
import { Hit } from './hit';
import { MoveType } from './move-type';
import { Source } from './source';

export interface Move {
  alternativeAnimations: AlternativeAnimation[] | null;
  autoCancelAfter: number | null;
  autoCancelBefore: number | null;
  end: number | null;
  start: number | null;
  gifUrl: string | null;
  hits: Hit[] | null;
  iasa: number | null;
  id: number;
  isInterpolated: boolean;
  landingFallSpecialLag: number | null;
  landLag: number | null;
  lCanceledLandLag: number | null;
  name: string | null;
  normalizedName: string | null;
  notes: string | null;
  percent: number | null;
  pngUrl: string | null;
  source: string | null;
  sources: Source[] | null;
  totalFrames: number;
  type: MoveType;
  webmUrl: string | null;
}
