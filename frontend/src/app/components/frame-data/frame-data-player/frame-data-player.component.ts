import { Component, input, OnInit, signal, ViewChild } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Divider } from 'primeng/divider';
import { PngAnimationPlayerComponent } from '../png-animation-player/png-animation-player.component';
import { Move } from '@/models/frame-data/move';

@Component({
  selector: 'app-frame-data-player',
  imports: [CardModule, ButtonModule, Divider, PngAnimationPlayerComponent],
  templateUrl: './frame-data-player.component.html',
  styleUrl: './frame-data-player.component.scss',
  standalone: true,
})
export class FrameDataPlayerComponent implements OnInit {
  readonly move = input.required<Move>();
  @ViewChild(PngAnimationPlayerComponent) pngPlayer!: PngAnimationPlayerComponent;
  isApple = false;
  isPlaying = true;
  frame = signal(0);
  ngOnInit(): void {
    if (this.getBrowserName() === 'Safari') {
      this.isApple = true;
    }
  }

  togglePlay(): void {
    if (this.isApple) {
      // Toggle the GIF player
    } else {
      this.pngPlayer.togglePlay();
      this.isPlaying = !this.isPlaying;
    }
  }

  nextFrame(): void {
    if (this.isApple) {
      // Toggle the GIF player
    } else {
      this.pngPlayer.nextFrame();
    }
  }

  previousFrame(): void {
    if (this.isApple) {
      // Toggle the GIF player
    } else {
      this.pngPlayer.previousFrame();
    }
  }

  setFrame(frame: number): void {
    if (this.isApple) {
      // Toggle the GIF player
    } else {
      this.pngPlayer.setFrame(frame);
    }
  }

  getBrowserName(): string {
    const ua = window.navigator.userAgent.toLowerCase();

    if (ua.indexOf('edg/') > -1) {
      return 'Edge (Chromium)';
    }
    if (ua.indexOf('edge/') > -1) {
      return 'Edge (Legacy)';
    }
    if (ua.indexOf('opr/') > -1) {
      return 'Opera';
    }
    if (ua.indexOf('chrome/') > -1) {
      return 'Chrome';
    }
    if (ua.indexOf('trident/') > -1) {
      return 'Internet Explorer';
    }
    if (ua.indexOf('firefox/') > -1) {
      return 'Firefox';
    }
    if (ua.indexOf('safari/') > -1) {
      return 'Safari';
    }

    return 'Other/Unknown';
  }
}
