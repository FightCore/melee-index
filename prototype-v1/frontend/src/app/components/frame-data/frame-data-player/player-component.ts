export interface PlayerComponent {
  togglePlay(): void;
  previousFrame(): void;
  nextFrame(): void;
  setFrame(frameNumber: number): void;
}
