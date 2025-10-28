import { Component, inject, input, model, OnInit } from '@angular/core';
import { PlayerComponent } from '@/app/components/frame-data/frame-data-player/player-component';
import { Move } from '@/models/frame-data/move';
import { HttpClient } from '@angular/common/http';
import parseAPNG from 'apng-js';
import Player from 'apng-js/types/library/player';

@Component({
  selector: 'app-png-animation-player',
  imports: [],
  templateUrl: './png-animation-player.component.html',
  styleUrl: './png-animation-player.component.scss',
})
export class PngAnimationPlayerComponent implements PlayerComponent, OnInit {
  private readonly httpClient = inject(HttpClient);
  private readonly containerId = 'container';

  readonly move = input.required<Move>();
  isPlaying = true;
  frame = model<number>(0);
  player?: Player;

  togglePlay(): void {
    if (!this.player) {
      return;
    }
    if (this.player?.paused) {
      this.player?.play();
    } else {
      this.player?.pause();
    }
  }
  previousFrame(): void {
    if (!this.player) {
      return;
    }
    if (!this.player.paused) {
      this.player.pause();
    }

    const currentFrame = this.player.currentFrameNumber;

    let targetFrame = currentFrame - 1;
    if (targetFrame < 0) {
      targetFrame = this.move().totalFrames;
    }

    this.goToFrame(targetFrame);
  }
  nextFrame(): void {
    if (!this.player) {
      return;
    }

    let targetFrame = this.player.currentFrameNumber + 1;
    if (targetFrame > this.move().totalFrames) {
      targetFrame = 0;
    }

    this.goToFrame(targetFrame);
  }

  setFrame(frameNumber: number): void {
    this.goToFrame(frameNumber);
  }

  ngOnInit(): void {
    this.httpClient.get(this.move().pngUrl!, { responseType: 'arraybuffer' }).subscribe(async (data) => {
      const apng = parseAPNG(data);
      if (apng instanceof Error) {
        return;
      }
      const canvas = document.createElement('canvas');
      canvas.width = apng.width;
      canvas.height = apng.height;
      canvas.style.width = 'auto';
      canvas.style.height = '100%';
      canvas.style.maxHeight = '50vh';
      canvas.style.maxWidth = '90vw';
      // TODO: Check for a proper way to do this with like view element
      const containerElement = document.getElementById(this.containerId);
      if (!containerElement) {
        console.warn(`Container with id "${this.containerId}" not found.`);
        return;
      }
      containerElement.appendChild(canvas);
      const ctx = canvas.getContext('2d');
      this.player = await apng.getPlayer(ctx!);
      this.player.playbackRate = 0.2;
      this.player.playbackRate = 0.2;
      this.player.addListener('frame', (frameNumber: number) => {
        this.frame.set(frameNumber + 1);
      });
      this.player.play();
    });
  }

  private goToFrame(frameNumber: number): void {
    if (!this.player) {
      return;
    }
    if (!this.player.paused) {
      this.player.pause();
    }

    while (this.player.currentFrameNumber !== frameNumber) {
      this.player.renderNextFrame();
    }
  }
}
