import { Component, input, OnInit, signal, viewChild } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Divider } from 'primeng/divider';
import { PngAnimationPlayerComponent } from '@/app/components/frame-data/png-animation-player/png-animation-player.component';
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
  pngPlayer = viewChild<PngAnimationPlayerComponent>('animationPlayer');
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
      this.pngPlayer()?.togglePlay();
      this.isPlaying = !this.isPlaying;
    }
  }

  nextFrame(): void {
    if (this.isApple) {
      // Toggle the GIF player
    } else {
      this.pngPlayer()?.nextFrame();
    }
  }

  previousFrame(): void {
    if (this.isApple) {
      // Toggle the GIF player
    } else {
      this.pngPlayer()?.previousFrame();
    }
  }

  setFrame(frame: number): void {
    if (this.isApple) {
      // Toggle the GIF player
    } else {
      this.pngPlayer()?.setFrame(frame);
    }
  }

  getBrowserName(): string {
    const ua = window.navigator.userAgent.toLowerCase();

    if (ua.includes('edg/')) {
      return 'Edge (Chromium)';
    }
    if (ua.includes('edge/')) {
      return 'Edge (Legacy)';
    }
    if (ua.includes('opr/')) {
      return 'Opera';
    }
    if (ua.includes('chrome/')) {
      return 'Chrome';
    }
    if (ua.includes('trident/')) {
      return 'Internet Explorer';
    }
    if (ua.includes('firefox/')) {
      return 'Firefox';
    }
    if (ua.includes('safari/')) {
      return 'Safari';
    }

    return 'Other/Unknown';
  }
}
